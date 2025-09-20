# Port Manager Script for Next.js Development
# Usage: .\port-manager.ps1 [action] [ports]
# Actions: scan, kill, clean

param(
    [string]$Action = "scan",
    [string]$Ports = "3000,3001,3002,3003,3004,3005"
)

function Get-ProcessOnPort {
    param([int]$Port)

    try {
        $connection = netstat -ano | Select-String ":$Port\s"
        if ($connection) {
            $pid = ($connection -split '\s+')[-1]
            $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
            return @{
                Port = $Port
                PID = $pid
                ProcessName = $process.ProcessName
                Path = $process.Path
            }
        }
    }
    catch {
        return $null
    }
    return $null
}

function Stop-PortProcess {
    param([int]$Port, [int]$PID, [string]$ProcessName)

    try {
        Stop-Process -Id $PID -Force
        Write-Host "Port $Port : Processus $ProcessName (PID: $PID) arrete" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "Erreur lors de l'arret du processus $PID sur le port $Port" -ForegroundColor Red
        return $false
    }
}

function Test-IsDevelopmentProcess {
    param([string]$ProcessName, [string]$Path)

    $devProcesses = @("node", "npm", "next", "vite", "webpack", "parcel")
    $devKeywords = @("node_modules", "npm", "next", "vite", "webpack", "dev")

    # Check process name
    foreach ($dev in $devProcesses) {
        if ($ProcessName -like "*$dev*") {
            return $true
        }
    }

    # Check path for development keywords
    if ($Path) {
        foreach ($keyword in $devKeywords) {
            if ($Path -like "*$keyword*") {
                return $true
            }
        }
    }

    return $false
}

# Main execution
$portList = $Ports -split ","
$foundProcesses = @()

Write-Host "Analyse des ports: $Ports" -ForegroundColor Cyan

# Scan ports
foreach ($port in $portList) {
    $portNum = [int]$port.Trim()
    $processInfo = Get-ProcessOnPort -Port $portNum

    if ($processInfo) {
        $foundProcesses += $processInfo
        $isDev = Test-IsDevelopmentProcess -ProcessName $processInfo.ProcessName -Path $processInfo.Path
        $status = if ($isDev) { "[DEV]" } else { "[SYS]" }

        Write-Host "$status Port $portNum : $($processInfo.ProcessName) (PID: $($processInfo.PID))"
    }
}

if ($foundProcesses.Count -eq 0) {
    Write-Host "Tous les ports specifies sont libres" -ForegroundColor Green
    exit 0
}

# Actions
switch ($Action.ToLower()) {
    "scan" {
        Write-Host "`n$($foundProcesses.Count) processus trouve(s)"
        Write-Host "Utilisez 'clean' pour liberer les ports de developpement"
    }

    "kill" {
        Write-Host "`nArret de tous les processus..."
        foreach ($proc in $foundProcesses) {
            Stop-PortProcess -Port $proc.Port -PID $proc.PID -ProcessName $proc.ProcessName
        }
    }

    "clean" {
        Write-Host "`nNettoyage des ports de developpement..."
        $cleaned = 0

        foreach ($proc in $foundProcesses) {
            $isDev = Test-IsDevelopmentProcess -ProcessName $proc.ProcessName -Path $proc.Path

            if ($isDev) {
                if (Stop-PortProcess -Port $proc.Port -PID $proc.PID -ProcessName $proc.ProcessName) {
                    $cleaned++
                }
            } else {
                Write-Host "Port $($proc.Port) : $($proc.ProcessName) ignore (processus systeme)" -ForegroundColor Yellow
            }
        }

        if ($cleaned -gt 0) {
            Write-Host "`n$cleaned port(s) libere(s) avec succes" -ForegroundColor Green
        } else {
            Write-Host "`nAucun port de developpement a liberer" -ForegroundColor Blue
        }
    }

    default {
        Write-Host "Action inconnue: $Action" -ForegroundColor Red
        Write-Host "Actions disponibles: scan, kill, clean"
    }
}