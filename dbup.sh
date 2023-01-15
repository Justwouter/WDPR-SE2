#!/bin/bash
startLocation=$(pwd)

searchfiles() {
    find . -name "$1" -print
}

migrateAll() {
    cd "$startLocation/backend" || exit

    for file in $(searchfiles "*Context.cs"); do
        db_context=$(basename "${file%.*}")
        if [ $# -eq 0 ]; then
            dotnet ef migrations add $RANDOM --context "$db_context"

        else
            dotnet ef migrations add "$1-$db_context" --context "$db_context"
        fi
        dotnet ef database update --context "$db_context"
    done

}

#possibly do smth with getops here.
checkVersion() {
    if [ "$1" = "-ua" ]; then
        shift
        migrateAll "$@"
        return
    fi

}

checkVersion "$@"

cd "$startLocation" || exit
