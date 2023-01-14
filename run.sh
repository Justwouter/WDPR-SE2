#!/usr/bin/env bash
runfunc() {
    if [[ "$1" == *"-dcd"* ]]; then
        ./deploy.sh
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
        return
    elif [[ "$1" == *"-dc"* ]]; then
        ./deploy.sh -r
        docker-compose -f docker-compose.yml -f docker-compose.test.yml up
        return
    fi

}

runfunc "$@"
