#!/usr/bin/env bash

startLocation=$(pwd)
if [[ "$1" == *"-dc"* ]]; then
    docker-compose up
else
    cd "$startLocation/frontend" || exit
    npm install && npm start
    cd "$startLocation/backend" || exit
    dotnet run
    cd "$startLocation" || exit
fi