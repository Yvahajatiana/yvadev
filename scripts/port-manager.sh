#!/bin/bash

# Port Manager Script for Next.js Development (Unix/Linux/macOS)
# Usage: ./port-manager.sh [action] [ports]
# Actions: scan, kill, clean

ACTION=${1:-scan}
PORTS=${2:-"3000,3001,3002,3003,3004,3005"}

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

get_process_on_port() {
    local port=$1
    local pid=$(lsof -ti:$port 2>/dev/null)

    if [ -n "$pid" ]; then
        local process_name=$(ps -p $pid -o comm= 2>/dev/null)
        local process_args=$(ps -p $pid -o args= 2>/dev/null)
        echo "$port:$pid:$process_name:$process_args"
    fi
}

stop_port_process() {
    local port=$1
    local pid=$2
    local process_name=$3

    if kill -9 $pid 2>/dev/null; then
        echo -e "${GREEN}✅ Port $port : Processus $process_name (PID: $pid) arrêté${NC}"
        return 0
    else
        echo -e "${RED}❌ Erreur lors de l'arrêt du processus $pid sur le port $port${NC}"
        return 1
    fi
}

is_development_process() {
    local process_name=$1
    local process_args=$2

    # Development processes
    local dev_processes=("node" "npm" "next" "vite" "webpack" "parcel")
    local dev_keywords=("node_modules" "npm" "next" "vite" "webpack" "dev" "localhost")

    # Check process name
    for dev in "${dev_processes[@]}"; do
        if [[ "$process_name" == *"$dev"* ]]; then
            return 0
        fi
    done

    # Check arguments for development keywords
    for keyword in "${dev_keywords[@]}"; do
        if [[ "$process_args" == *"$keyword"* ]]; then
            return 0
        fi
    done

    return 1
}

# Main execution
IFS=',' read -ra PORT_ARRAY <<< "$PORTS"
declare -a found_processes

echo -e "${CYAN}🔍 Analyse des ports: $PORTS${NC}"

# Scan ports
for port in "${PORT_ARRAY[@]}"; do
    port=$(echo $port | xargs) # trim whitespace
    process_info=$(get_process_on_port $port)

    if [ -n "$process_info" ]; then
        IFS=':' read -ra INFO <<< "$process_info"
        port_num=${INFO[0]}
        pid=${INFO[1]}
        process_name=${INFO[2]}
        process_args=${INFO[3]}

        found_processes+=("$process_info")

        if is_development_process "$process_name" "$process_args"; then
            status="${YELLOW}🟡 DEV${NC}"
        else
            status="${RED}🔴 SYS${NC}"
        fi

        echo -e "$status Port $port_num : $process_name (PID: $pid)"
    fi
done

if [ ${#found_processes[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ Tous les ports spécifiés sont libres${NC}"
    exit 0
fi

# Actions
case "${ACTION,,}" in
    "scan")
        echo -e "\n${BLUE}📊 ${#found_processes[@]} processus trouvé(s)${NC}"
        echo "Utilisez 'clean' pour libérer les ports de développement"
        ;;

    "kill")
        echo -e "\n${RED}🛑 Arrêt de tous les processus...${NC}"
        for process_info in "${found_processes[@]}"; do
            IFS=':' read -ra INFO <<< "$process_info"
            stop_port_process ${INFO[0]} ${INFO[1]} ${INFO[2]}
        done
        ;;

    "clean")
        echo -e "\n${CYAN}🧹 Nettoyage des ports de développement...${NC}"
        cleaned=0

        for process_info in "${found_processes[@]}"; do
            IFS=':' read -ra INFO <<< "$process_info"
            port_num=${INFO[0]}
            pid=${INFO[1]}
            process_name=${INFO[2]}
            process_args=${INFO[3]}

            if is_development_process "$process_name" "$process_args"; then
                if stop_port_process $port_num $pid $process_name; then
                    ((cleaned++))
                fi
            else
                echo -e "${YELLOW}⚠️  Port $port_num : $process_name ignoré (processus système)${NC}"
            fi
        done

        if [ $cleaned -gt 0 ]; then
            echo -e "\n${GREEN}🎉 $cleaned port(s) libéré(s) avec succès${NC}"
        else
            echo -e "\n${BLUE}ℹ️  Aucun port de développement à libérer${NC}"
        fi
        ;;

    *)
        echo -e "${RED}❌ Action inconnue: $ACTION${NC}"
        echo "Actions disponibles: scan, kill, clean"
        ;;
esac