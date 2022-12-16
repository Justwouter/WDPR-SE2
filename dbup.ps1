#Easy update script. Use .\dbup {args} or put in PATH

#Check if any argument is passed
if($null -eq $args[0]){
    throw "Please enter a migration name or use the -d parameter for random naming"
}

$startLocation=Get-Location

try{
    Set-Location "$startlocation/backend"    

    #Check if the default parameter is used
    if( -not($args.Contains(("-u")))){
        if($args[0] -eq "-d"){
            $randomname = -join ((65..90) + (97..122) | Get-Random -Count 5 | ForEach-Object {[char]$_})
            dotnet ef migrations add $randomname
        }
        else {
            $migration_name=$args[0]
            dotnet ef migrations add $migration_name
        }
    }
    dotnet ef database update
}
finally{
    Set-Location $startLocation
}

