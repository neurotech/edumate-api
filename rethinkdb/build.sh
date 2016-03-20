#!/bin/bash

RETHINKDB_VERSION="2.2.5"

echo "Pulling Docker image: rethinkdb:$RETHINKDB_VERSION"
docker pull rethinkdb:$RETHINKDB_VERSION
