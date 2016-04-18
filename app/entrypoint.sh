#!/bin/sh

echo '----------------'
echo 'Running setup.js'
echo '----------------'
node setup.js

echo '-------------------'
echo 'Running edumate-api'
echo '-------------------'
node index.js
