#!/usr/bin/env bash
#Yes the urls could also be changed by the prod/dev compose files but where is the fun in that?
ReplaceInFile() {
    rules=("${@:2}")
    for condition in "${rules[@]}"; do
        sed -i "$condition" "$1"
    done
    sed -i "$lineEnding" "$1"

}

deploy() {
    if [[ "$1" == *"-r"* ]]; then
        #When argument -r is passed, restore urls to their localhost equivalent.
        for folder in "${folderlocations[@]}"; do
            cd "$folder" || exit
            files=$(find . -name '*.js' -o -name '*.cs')
            for file in $files; do
                ReplaceInFile "$file" "${DevSedConditions[@]}"
            done
        done
        #Add a separate check for docker-compose, this is easier than excluding all script files in the root dir.
        cd "$startLocation" || exit
        ReplaceInFile docker-compose.yml "${DevSedConditions[@]}"
    else
        #Check if a file contains a specific url & change it to its production value
        for folder in "${folderlocations[@]}"; do
            cd "$folder" || exit
            files=$(find . -name '*.js' -o -name '*.cs')
            for file in $files; do
                ReplaceInFile "$file" "${ProdSedConditions[@]}"
            done
        done
        #Add a seperate check for docker-compose, this is easier than excluding all script files in the root dir.
        cd "$startLocation" || exit
        ReplaceInFile docker-compose.yml "${ProdSedConditions[@]}"
    fi
}

#Global vars
startLocation=$(pwd)
folderlocations=("$startLocation/frontend/src/" "$startLocation/backend/LaakAPI")
CR=$(printf '\r')
DevSedConditions=('s#https://api.theaterlaak.site#http://api.localhost#g' 's#https://test.theaterlaak.site#http://test.localhost#g' 's#https://theaterlaak.site#http://frontend.localhost#g' 's/api.theaterlaak.site/api.localhost/g' 's/test.theaterlaak.site/test.localhost/g' 's/theaterlaak.site/frontend.localhost/g')
ProdSedConditions=('s#http://api.localhost#https://api.theaterlaak.site#g' 's#http://test.localhost#https://test.theaterlaak.site#g' 's#http://frontend.localhost#https://theaterlaak.site#g' 's/api.localhost/api.theaterlaak.site/g' 's/test.localhost/test.theaterlaak.site/g' 's/frontend.localhost/theaterlaak.site/g')
lineEnding="$ ! s/\$/$CR/" #Inserts a carriage return after every line ending except the last otherwise newlines will be appended to a file everytime this condition is used.

deploy "$@"
