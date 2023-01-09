$startLocation=Get-Location
if($args.Contains("-r")){
    Set-Location "$startLocation/frontend/src/"
    $files = Get-Location | Get-ChildItem -Recurse | Where-Object {$_.extension -eq ".js"}

    for ($i=0; $i -lt $files.Count; $i++) {
        ((Get-Content -path $files[$i].FullName -Raw) -replace 'api.theaterlaak.site','api.localhost' -replace 'theaterlaak.site','frontend.localhost') | Set-Content -Path $files[$i].FullName -NoNewline
    }
    #Step two, docker
    Set-Location $startLocation
    ((Get-Content .\docker-compose.yml -Raw) -replace 'api.theaterlaak.site','api.localhost' -replace 'theaterlaak.site','frontend.localhost') | Set-Content .\docker-compose.yml -NoNewline
        

}
else {
    #Step one, node
    Set-Location "$startLocation/frontend/src/"
    $files = Get-Location | Get-ChildItem -Recurse | Where-Object {$_.extension -eq ".js"}

    for ($i=0; $i -lt $files.Count; $i++) {
        ((Get-Content -path $files[$i].FullName -Raw) -replace 'api.localhost','api.theaterlaak.site' -replace 'frontend.localhost','theaterlaak.site') | Set-Content -Path $files[$i].FullName -NoNewline
    }
    #Step two, docker
    Set-Location $startLocation
    ((Get-Content .\docker-compose.yml -Raw) -replace 'api.localhost','api.theaterlaak.site' -replace 'frontend.localhost','theaterlaak.site') | Set-Content .\docker-compose.yml -NoNewline
        
}
