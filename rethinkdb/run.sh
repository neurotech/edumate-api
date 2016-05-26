#!/bin/bash

echo "Starting RethinkDB image as edumate-api-db"
docker run \
  --net=edumate-api \
  --name edumate-api-db \
  --log-driver=json-file \
  --log-opt max-size=50m \
  --log-opt max-file=4 \
  --restart=on-failure:5 \
  --memory "512MB" \
  --memory-swap "0" \
  -d edumate-api-db
