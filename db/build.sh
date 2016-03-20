#!/bin/sh

echo "Building postgres image."
docker build -t edumate-api-db .
