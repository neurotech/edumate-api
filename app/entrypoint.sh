#!/bin/sh

echo '----------------'
echo 'Running DB setup'
echo '----------------'
node setup.js

echo '-------------------'
echo 'Running edumate-api'
echo '-------------------'
node index.js
