# start-dev.ps1

# --- CONFIGURATION ---
$nginxExe = "C:\Program Files\nginx-1.28.0\nginx.exe"


# --- Vérifier Nginx ---
$nginxRunning = Get-Process -Name "nginx" -ErrorAction SilentlyContinue
if ($nginxRunning) {
    Write-Host "✅ Nginx est déjà en cours d'exécution (PID: $($nginxRunning.Id))"
} elseif (Test-Path $nginxExe) {
    Start-Process -FilePath $nginxExe
    Write-Host "Nginx lancé."
} else {
    Write-Host "nginx.exe introuvable à l'emplacement spécifié."
    exit 1
}

# --- Vérifier PostgreSQL ---
try {
    $pgStatus = pg_ctl status
} catch {
    Write-Host "Erreur lors de la vérification de PostgreSQL : $($_.Exception.Message)"
    exit 1
}

if ($pgStatus -match "no server running") {
    Write-Host "PostgreSQL n'est pas lancé. Démarrage..."
    pg_ctl start
} else {
    Write-Host "PostgreSQL est déjà en cours d'exécution."
}

# --- Lancer le serveur de développement ---
Write-Host "Lancement du serveur de développement..."
next dev --turbo