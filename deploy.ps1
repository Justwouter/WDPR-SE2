$startLocation = Get-Location
$folderlocations = @("$startLocation/frontend/src/", "$startLocation/backend/")

if ($args.Contains("-r")) {
    
    foreach ($folder in $folderlocations) {
        Set-Location $folder
        $files = Get-Location | Get-ChildItem -Recurse | Where-Object { $_.extension -eq ".js" -or $_.extension -eq ".cs" }

        for ($i = 0; $i -lt $files.Count; $i++) {
            ((Get-Content -path $files[$i].FullName -Raw) -replace 'api.theaterlaak.site', 'api.localhost' -replace 'theaterlaak.site', 'frontend.localhost') | Set-Content -Path $files[$i].FullName -NoNewline
        }
    
        
    }

    Set-Location $startLocation
    ((Get-Content .\docker-compose.yml -Raw) -replace 'api.theaterlaak.site', 'api.localhost' -replace 'theaterlaak.site', 'frontend.localhost') | Set-Content .\docker-compose.yml -NoNewline
    # ((Get-Content .\Proxy\Caddy\Caddyfile -Raw) -replace 'api.theaterlaak.site', 'api.localhost' -replace 'theaterlaak.site', 'frontend.localhost') | Set-Content .\Proxy\Caddy\Caddyfile -NoNewline
    

}
else {

    foreach ($folder in $folderlocations) {
        Set-Location $folder
        $files = Get-Location | Get-ChildItem -Recurse | Where-Object { $_.extension -eq ".js" -or $_.extension -eq ".cs" }

        for ($i = 0; $i -lt $files.Count; $i++) {
            ((Get-Content -path $files[$i].FullName -Raw) -replace 'api.localhost', 'api.theaterlaak.site' -replace 'frontend.localhost', 'theaterlaak.site') | Set-Content -Path $files[$i].FullName -NoNewline
        }
    }

    Set-Location $startLocation
    ((Get-Content .\docker-compose.yml -Raw) -replace 'api.localhost', 'api.theaterlaak.site' -replace 'frontend.localhost', 'theaterlaak.site') | Set-Content .\docker-compose.yml -NoNewline
    # ((Get-Content .\Proxy\Caddy\Caddyfile -Raw) -replace 'api.localhost', 'api.theaterlaak.site' -replace 'frontend.localhost', 'theaterlaak.site') | Set-Content .\Proxy\Caddy\Caddyfile -NoNewline

}
