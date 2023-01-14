#!/usr/bin/env bash

startLocation=$(pwd)
folderlocations=("$startLocation/frontend/src/" "$startLocation/backend/")

CR=$(printf '\r')


if [[ "$1" == *"-r"* ]]; then
    #When argument -r is passed, restore urls to their localhost equivalent.
    for folder in "${folderlocations[@]}"; do
        cd "$folder" || exit
        files=$(find . -name '*.js' -o -name '*.cs')

        for file in $files; do
            sed -i 's/api.theaterlaak.site/api.localhost/g' "$file"
            sed -i 's/theaterlaak.site/frontend.localhost/g' "$file"
            sed -i "$ ! s/\$/$CR/" "$file"
        done

    done

    #Add a seperate check for docker-compose, this is easier than excluding all script files in the root dir.
    cd "$startLocation" || exit
    sed -i 's/api.theaterlaak.site/api.localhost/g' docker-compose.yml
    sed -i 's/theaterlaak.site/frontend.localhost/g' docker-compose.yml
    sed -i "$ ! s/\$/$CR/" docker-compose.yml

else
    #Check if a file contains a specific url & change it to its production value
    for folder in "${folderlocations[@]}"; do
        cd "$folder" || exit
        files=$(find . -name '*.js' -o -name '*.cs')

        for file in $files; do
            sed -i 's/api.localhost/api.theaterlaak.site/g' "$file"
            sed -i 's/frontend.localhost/theaterlaak.site/g' "$file"
            sed -i "$ ! s/\$/$CR/" "$file"

        done

    done

    #Add a seperate check for docker-compose, this is easier than excluding all script files in the root dir.
    cd "$startLocation" || exit
    sed -i 's/api.localhost/api.theaterlaak.site/g' docker-compose.yml
    sed -i 's/frontend.localhost/theaterlaak.site/g' docker-compose.yml
    sed -i "$ ! s/\$/$CR/" docker-compose.yml

fi
