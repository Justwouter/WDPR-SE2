#!/usr/bin/env bash
#Call this script and pass the folders to be deleted as space seperated arguments



function NotPresent() {
    for folder in "${@}"; do
        # Use find command to recursively search for the folder name
        find . -name "$folder" -type d -exec rm -rf {} +
        echo "Deleted folder: $folder"
    done
}

function selectMode() {
    while getopts ":d" opt; do
        case $opt in
        d)
            default_flag=true
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
            ;;
        esac
    done
    if [[ -z $default_flag ]]; then
        NotPresent "$@"
    else
    default_folders=('node_modules' 'bin' 'obj')
        Present "${default_folders[@]}"
    fi
}
