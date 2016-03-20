#!/bin/sh

if [[ $POSTGRES_PASSWORD ]];
  then
    echo "POSTGRES_PASSWORD is set. Running postgres container."
    sleep 0.5
    docker run \
      --net=edumate-api \
      --name edumate-api-db \
      -p 5432:5432 \
      -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
      --log-driver=json-file \
      --log-opt max-size=50m \
      --log-opt max-file=4 \
      --restart=on-failure:5 \
      --memory "256M" \
      -d edumate-api-db
  else
    echo "The POSTGRES_PASSWORD environment variable is not set! Please set it and re-run this script with npm run docker-db-run"
    exit 1
fi
