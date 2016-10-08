#!/usr/bin/env bash
#script to init project
npm install
bower install
cp ./init/config.local.json  ./src/app/config/config.local.json
