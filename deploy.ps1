$startLocation = Get-Location
$folderlocations = @("$startLocation/frontend/src/", "$startLocation/backend/")

if ($args.Contains("-r")) {
    
    foreach ($folder in $folderlocations) {
        Set-Location $folder
        $files = Get-Location | Get-ChildItem -Recurse | Where-Object { $_.extension -eq ".js" -or $_.extension -eq ".cs" }

        for ($i = 0; $i -lt $files.Count; $i++) {
            ((Get-Content -path $files[$i].FullName -Raw) -replace 'https://api.theaterlaak.site', 'http://api.localhost' -replace 'https://test.theaterlaak.site', 'http://test.localhost' -replace 'https://theaterlaak.site', 'http://frontend.localhost') | Set-Content -Path $files[$i].FullName -NoNewline
        }
    
        
    }

    Set-Location $startLocation
    ((Get-Content .\docker-compose.yml -Raw) -replace 'https://api.theaterlaak.site', 'http://api.localhost' -replace 'https://test.theaterlaak.site', 'http://test.localhost' -replace 'https://theaterlaak.site', 'http://frontend.localhost') | Set-Content .\docker-compose.yml -NoNewline
    # ((Get-Content .\Proxy\Caddy\Caddyfile -Raw) -replace 'https://api.theaterlaak.site', 'http://api.localhost' -replace 'theaterlaak.site', 'http://frontend.localhost') | Set-Content .\Proxy\Caddy\Caddyfile -NoNewline
    

}
else {

    foreach ($folder in $folderlocations) {
        Set-Location $folder
        $files = Get-Location | Get-ChildItem -Recurse | Where-Object { $_.extension -eq ".js" -or $_.extension -eq ".cs" }

        for ($i = 0; $i -lt $files.Count; $i++) {
            ((Get-Content -path $files[$i].FullName -Raw) -replace 'http://api.localhost', 'https://api.theaterlaak.site' -replace 'http://frontend.localhost', 'https://theaterlaak.site' -replace 'http://test.localhost', 'https://test.theaterlaak.site') | Set-Content -Path $files[$i].FullName -NoNewline
        }
    }

    Set-Location $startLocation
    ((Get-Content .\docker-compose.yml -Raw) -replace 'http://api.localhost', 'https://api.theaterlaak.site' -replace 'http://frontend.localhost', 'https://theaterlaak.site' -replace 'http://test.localhost', 'https://test.theaterlaak.site') | Set-Content .\docker-compose.yml -NoNewline
    # ((Get-Content .\Proxy\Caddy\Caddyfile -Raw) -replace 'http://api.localhost', 'https://api.theaterlaak.site' -replace 'http://frontend.localhost', 'theaterlaak.site') | Set-Content .\Proxy\Caddy\Caddyfile -NoNewline

}
