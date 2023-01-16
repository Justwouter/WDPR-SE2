#!/bin/bash

searchfiles() {
    cd "$1" || exit
    find . -name "$2" -print
}

migrateAll() {

    for file in $(searchfiles "data" "*Context.cs"); do
        db_context=$(basename "${file%.*}")
        if [ $# -eq 0 ]; then
            migrateSingleContext $RANDOM --context "$db_context"

        else
            migrateSingleContext "$1-$db_context" --context "$db_context"
        fi
        updateSingleContext --context "$db_context"
    done
}

updateSingleContext() {
    dotnet ef database update "${@:1}"
}

migrateSingleContext() {
    dotnet ef migrations add "${@:1}"
}

functionSelector() {
    cd "$startLocation/backend" || exit
    if [ "$1" = "-ua" ]; then
        shift
        migrateAll "$@"
        return
    elif [[ "$1" = "-h" || "$1" = "-?" ]]; then
        printf "Use -c to specify a context
                Use -u to skip the migration and just update"
    else
        #Check the arguments
        while getopts ":c:u:n:" opt; do
            case $opt in
            c)
                context_entry=$OPTARG
                ;;
            u)
                update_entry=true
                ;;
            n)
                defaultnaming_entry=$OPTARG
                ;;
            \?)
                echo "Invalid option: -$OPTARG" >&2
                exit 1
                ;;
            esac
        done

        #If the -d flag is used, skip migrating
        if [[ -z $update_entry ]]; then
            migratecmd+="migrateSingleContext"
            #If a name is specified add the name to the command, else use a random number
            if [[ -n $defaultnaming_entry ]]; then
                migratecmd+=" $defaultnaming_entry"
            else
                migratecmd+=" $RANDOM"
            fi
            #If a context is specified add the context to the migration name. This param is not required so no default vars
            if [[ -n $context_entry ]]; then
                migratecmd+="-$context_entry --context $context_entry"
            fi
            $migratecmd
        fi
        updatecmd+="updateSingleContext"
        #If a context is specified add the context to the command. This param is not required
        if [[ -n $context_entry ]]; then
            updatecmd+=" --context $context_entry"
        fi
        $updatecmd
    fi
}

startLocation=$(pwd)

functionSelector "$@"

cd "$startLocation" || exit
