$startLocation=Get-Location
if ($args.contains("-dcp")) {
    ./deploy
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
    continue
}
elseif ($args.contains("-dc")) {
    ./deploy -r
    docker-compose -f docker-compose.yml -f docker-compose.test.yml up
}
else {
    Set-Location "$startLocation/frontend"
    Start-Process cmd -Argument "/c npm install && npm start"
    Set-Location "$startLocation/backend"
    Start-Process cmd -Argument "/c dotnet run"
    Set-Location $startLocation
}

