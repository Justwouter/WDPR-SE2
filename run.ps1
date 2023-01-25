$startLocation=Get-Location

if ($args.contains("-dcd")) {
    ./deploy
    cd ./frontend
    npm run build
    cd $startLocation
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up #$args[1..($args.Count-1)]
    continue
}
elseif ($args.contains("-dc")) {
    ./deploy -r
    docker-compose -f docker-compose.yml -f docker-compose.test.yml up #$args[1..($args.Count-1)]
    continue
}
elseif ($args.Contains("-t")) {
    
}
else {
    Set-Location "$startLocation/frontend"
    Start-Process cmd -Argument "/c npm install && npm start"
    Set-Location "$startLocation/backend"
    Start-Process cmd -Argument "/c dotnet run"
    Set-Location $startLocation
}

