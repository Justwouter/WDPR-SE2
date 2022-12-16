$startLocation=Get-Location

Set-Location "$startLocation/frontend"
Start-Process cmd -Argument "/c npm install && npm start"
Set-Location "$startLocation/backend"
Start-Process cmd -Argument "/c dotnet run"
Set-Location $startLocation
