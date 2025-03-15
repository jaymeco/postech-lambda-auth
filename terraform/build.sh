#! /bin/bash

cd ../function
npx tsc --build
cp ./package.json ./dist

cd ./dist
npm install --production