# stop-services.ps1

# --- Stop Nginx ---
$nginxProcesses = Get-Process -Name "nginx" -ErrorAction SilentlyContinue
if ($nginxProcesses) {
    foreach ($proc in $nginxProcesses) {
        Write-Host "Arrêt du processus Nginx (PID: $($proc.Id))..."
        Stop-Process -Id $proc.Id -Force
    }
    Write-Host "Tous les processus Nginx ont été arrêtés."
} else {
    Write-Host "Aucun processus Nginx en cours."
}

# --- Stop PostgreSQL ---
try {
    $pgStatus = pg_ctl status
    if ($pgStatus -match "server is running") {
        Write-Host "PostgreSQL est actif. Arrêt en cours..."
        pg_ctl stop -m fast
        Write-Host "PostgreSQL arrêté."
    } else {
        Write-Host "PostgreSQL n'est pas en cours d'exécution."
    }
} catch {
    Write-Host "Erreur lors de la vérification de PostgreSQL : $($_.Exception.Message)"
}