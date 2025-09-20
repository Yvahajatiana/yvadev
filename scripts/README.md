# Port Manager Scripts

Scripts pour gérer et libérer les ports occupés par les serveurs de développement Next.js.

## Utilisation

### Windows (PowerShell)
```powershell
# Scanner les ports par défaut (3000-3005)
.\scripts\port-manager.ps1 scan

# Scanner des ports spécifiques
.\scripts\port-manager.ps1 scan "3000,3001,8080"

# Nettoyer uniquement les processus de développement
.\scripts\port-manager.ps1 clean

# Arrêter tous les processus (attention!)
.\scripts\port-manager.ps1 kill
```

### Unix/Linux/macOS (Bash)
```bash
# Scanner les ports par défaut
./scripts/port-manager.sh scan

# Scanner des ports spécifiques
./scripts/port-manager.sh scan "3000,3001,8080"

# Nettoyer uniquement les processus de développement
./scripts/port-manager.sh clean

# Arrêter tous les processus (attention!)
./scripts/port-manager.sh kill
```

## Actions disponibles

- **scan** : Analyse les ports et affiche les processus trouvés
- **clean** : Arrête uniquement les processus de développement (sécurisé)
- **kill** : Arrête tous les processus sur les ports (attention!)

## Processus de développement détectés

- Node.js (node, npm, npx)
- Next.js (next)
- Vite (vite)
- Webpack (webpack)
- Parcel (parcel)

## Sécurité

Les scripts vérifient automatiquement si un processus est lié au développement avant de l'arrêter en mode `clean`. En mode `kill`, tous les processus sont arrêtés (utiliser avec précaution).

## Agent Claude Code

Ces scripts sont utilisés par l'agent `port-manager` de Claude Code pour automatiser la gestion des ports. L'agent peut être appelé avec des commandes comme :

- "Libère les ports Next.js"
- "Nettoie les ports de développement"
- "Quel processus utilise le port 3000 ?"