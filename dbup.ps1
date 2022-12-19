#Easy update script. Use .\dbup {args} or put in PATH

#Check if any argument is passed
if ($null -eq $args[0]) {
    throw "Please enter a migration name or use the -d parameter for random naming. Use -u to only update and -c to specify a context"
}

$startLocation = Get-Location

try {
    Set-Location "$startlocation/backend"    
    

    #I Don't have the mental capacity to deal with this rn so it will bes scuffed
    if ($args.Contains("-c")) {
        $AdditionalModifierNumber = [array]::IndexOf($args, "-c")
    
        if ( -not($args.Contains(("-u")))) {
            
            if ($args.Contains("-d")) {
                $randomname = -join ((65..90) + (97..122) | Get-Random -Count 5 | ForEach-Object { [char]$_ })
                dotnet ef migrations add $args[$AdditionalModifierNumber] $args[$AdditionalModifierNumber + 1] $randomname 
                
            }
            else {
                $migration_name = $args[0]
                dotnet ef migrations add $args[$AdditionalModifierNumber] $args[$AdditionalModifierNumber + 1] $migration_name 
                
            }
        }
        dotnet ef database update $args[$AdditionalModifierNumber] $args[$AdditionalModifierNumber + 1]
    }
    else {
        if ( -not($args.Contains(("-u")))) {
            if ($args.Contains("-d")) {
                $randomname = -join ((65..90) + (97..122) | Get-Random -Count 5 | ForEach-Object { [char]$_ })
                dotnet ef migrations add $randomname 
                
            }
            else {
                $migration_name = $args[0]
                dotnet ef migrations add $migration_name 
            }
        }
        dotnet ef database update 
    }
}
finally {
    Set-Location $startLocation
}

