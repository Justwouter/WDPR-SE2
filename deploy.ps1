$startLocation = Get-Location
$folderlocations = @("$startLocation/frontend/src/", "$startLocation/backend/")

if ($args.Contains("-r")) {
    
    foreach ($folder in $folderlocations) {
        Set-Location $folder
        $files = Get-Location | Get-ChildItem -Recurse | Where-Object { $_.extension -eq ".js" -or $_.extension -eq ".cs" }

        for ($i = 0; $i -lt $files.Count; $i++) {
            ((Get-Content -path $files[$i].FullName -Raw) -creplace 'https://api.theaterlaak.site', 'http://api.localhost' -creplace 'https://test.theaterlaak.site', 'http://test.localhost' -creplace 'https://theaterlaak.site', 'http://frontend.localhost' -creplace 'api.theaterlaak.site', 'api.localhost' -creplace 'test.theaterlaak.site', 'test.localhost' -creplace 'theaterlaak.site', 'frontend.localhost' ) | Set-Content -Path $files[$i].FullName -NoNewline
        }
    
        
    }

    Set-Location $startLocation
    ((Get-Content .\docker-compose.yml -Raw) -creplace 'https://api.theaterlaak.site', 'http://api.localhost' -creplace 'https://test.theaterlaak.site', 'http://test.localhost' -creplace 'https://theaterlaak.site', 'http://frontend.localhost' -creplace 'api.theaterlaak.site', 'api.localhost' -creplace 'test.theaterlaak.site', 'test.localhost' -creplace 'theaterlaak.site', 'frontend.localhost') | Set-Content .\docker-compose.yml -NoNewline
    # ((Get-Content .\Proxy\Caddy\Caddyfile -Raw) -creplace 'https://api.theaterlaak.site', 'http://api.localhost' -creplace 'theaterlaak.site', 'http://frontend.localhost') | Set-Content .\Proxy\Caddy\Caddyfile -NoNewline
    

}
else {

    foreach ($folder in $folderlocations) {
        Set-Location $folder
        $files = Get-Location | Get-ChildItem -Recurse | Where-Object { $_.extension -eq ".js" -or $_.extension -eq ".cs" }

        for ($i = 0; $i -lt $files.Count; $i++) {
            ((Get-Content -path $files[$i].FullName -Raw) -creplace 'http://api.localhost', 'https://api.theaterlaak.site' -creplace 'http://frontend.localhost', 'https://theaterlaak.site' -creplace 'http://test.localhost', 'https://test.theaterlaak.site' -creplace 'api.localhost', 'api.theaterlaak.site' -creplace 'frontend.localhost', 'theaterlaak.site' -creplace 'test.localhost', 'test.theaterlaak.site') | Set-Content -Path $files[$i].FullName -NoNewline
        }
    }

    Set-Location $startLocation
    ((Get-Content .\docker-compose.yml -Raw) -creplace 'http://api.localhost', 'https://api.theaterlaak.site' -creplace 'http://frontend.localhost', 'https://theaterlaak.site' -creplace 'http://test.localhost', 'https://test.theaterlaak.site' -creplace 'api.localhost', 'api.theaterlaak.site' -creplace 'frontend.localhost', 'theaterlaak.site' -creplace 'test.localhost', 'test.theaterlaak.site') | Set-Content .\docker-compose.yml -NoNewline
    # ((Get-Content .\Proxy\Caddy\Caddyfile -Raw) -creplace 'http://api.localhost', 'https://api.theaterlaak.site' -creplace 'http://frontend.localhost', 'theaterlaak.site') | Set-Content .\Proxy\Caddy\Caddyfile -NoNewline

}
