#!/usr/bin/env bash

#Can also use getops to make it more idiot proof
runfunc() {
    if [[ "$1" == *"-a"* || "$1" == *"acme"* ]]; then
        docker-compose -f docker-compose.acme.yml up "${@:2}"
        return
    elif [[ "$1" == *"-dcd"* || "$1" == *"prod"* ]]; then
        ./deploy.sh
        cd ./frontend || exit
        npm run build
        cd "$startLocation" || exit
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up "${@:2}"
        return
    elif [[ "$1" == *"-dc"* || "$1" == *"dev"* ]]; then
        ./deploy.sh -r
        docker-compose -f docker-compose.yml -f docker-compose.test.yml up "${@:2}"
        return
    else
        cd ./frontend || exit
        npm install && npm start &
        cd ../backend || exit
        dotnet run &
        cd "$startLocation" || exit
    fi

}

installDependencies(){
    cd ./frontend && npm install || exit
    cd ../backend && dotnet restore || exit
    cd "$startLocation" || exit
}

startLocation=$(pwd)
installDependencies
runfunc "$@"
