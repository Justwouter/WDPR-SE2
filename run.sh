#!/usr/bin/env bash

runfunc() {
    if [[ "$1" == *"-dcd"* || "$1" == *"prod"* ]]; then
        ./deploy.sh
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up "${@:2}"
        return
    elif [[ "$1" == *"-dc"* || "$1" == *"dev"* ]]; then
        ./deploy.sh -r
        docker-compose -f docker-compose.yml -f docker-compose.test.yml up "${@:2}"
        return
    fi

}

runfunc "$@"
