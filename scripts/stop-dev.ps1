$procs = Get-CimInstance Win32_Process | Where-Object {
    $_.CommandLine -match 'next(\.js)?\s+(dev|start)' -or
    $_.CommandLine -match 'next-server' -or
    $_.CommandLine -match 'next\\dist\\bin\\next'
}

if (-not $procs) {
    Write-Host "No running Next.js server processes found."
    exit 0
}

foreach ($p in $procs) {
    Write-Host "Killing PID $($p.ProcessId): $($p.CommandLine)"
    Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue
}
