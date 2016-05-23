#!/bin/bash

RETHINKDB_VERSION="2.3.2"

echo "Pulling Docker image: rethinkdb:$RETHINKDB_VERSION"
docker pull rethinkdb:$RETHINKDB_VERSION
