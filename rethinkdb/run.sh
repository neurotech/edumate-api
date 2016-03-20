#!/bin/bash

RETHINKDB_VERSION="2.2.5"

echo "Starting rethinkdb:$RETHINKDB_VERSION as edumate-api-db"
docker run \
  --net=edumate-api \
  --name edumate-api-db \
  --log-driver=json-file \
  --log-opt max-size=50m \
  --log-opt max-file=4 \
  --restart=on-failure:5 \
  --memory "512M" \
  -d rethinkdb:$RETHINKDB_VERSION
