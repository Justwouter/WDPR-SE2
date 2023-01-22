$startLocation=Get-Location
$srcFolder = "$startLocation/backend"
$tempfolder = "$startLocation/backend/dbStore"

mkdir $tempfolder
#Move the files to a temp folder
$files = Get-ChildItem -Path $srcFolder -Filter "*DB.sqlite"
foreach ($file in $files) {
    $filePath = Join-Path -Path $srcFolder -ChildPath $file
    Move-Item -path $filePath -Destination $tempfolder
}
#Call the dbup script to generate clean db files
Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"dbup.ps1 `" -ua -d" -NoNewWindow -Wait 
Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"run.ps1 `" -dc -d" -NoNewWindow
Set-Location "$startLocation/frontend"
npm run cypress


#Move the files back to their start folder
$files = Get-ChildItem -Path $tempfolder -Filter "*DB.sqlite"
foreach ($file in $files) {
    $filePath = Join-Path -Path $tempFolder -ChildPath $file
    Move-Item -Path $filePath -Destination $srcFolder -Force
}


#Remove the temp folder & return the user to the start location
Remove-Item $tempfolder
Set-Location "$startLocation"
