$password = "String1!"
# 1..100 | % { 
#     # Invoke-WebRequest -UseBasicParsing http://localhost/api/Account/registreer -ContentType "application/json" -Method POST -Body '{ "userName: Kevin-$_", "password: String1!"}'
#     Invoke-WebRequest -UseBasicParsing -Method POST -Uri 'http://localhost/api/Account/registreer' -ContentType 'application/json' -Body ('{"userName":"' + "Kevin-"+$_ + '","Password":"' + $password + '"}')
# }

1..100 | % { 

    try {
        Invoke-WebRequest -UseBasicParsing -Method POST -Uri 'http://localhost/api/Account/registreer' -ContentType 'application/json' -Body ('{"userName":"' + "Kevin-" + $_ + '","Password":"' + $password + '"}')

    }
    catch {
        $streamReader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $ErrResp = $streamReader.ReadToEnd() | ConvertFrom-Json
        $streamReader.Close()
    }
    $ErrResp 
}

