#!/bin/sh

echo "Running node container."
sleep 0.5s
docker run \
  --net=edumate-api \
  -e EDUMATE_API_HTTP_HOST=$EDUMATE_API_HTTP_HOST \
  -e EDUMATE_API_HTTP_PORT=$EDUMATE_API_HTTP_PORT \
  -e EDUMATE_HOST=$EDUMATE_HOST \
  -e EDUMATE_PORT=$EDUMATE_PORT \
  -e EDUMATE_PATH=$EDUMATE_PATH \
  -e EDUMATE_USERNAME=$EDUMATE_USERNAME \
  -e EDUMATE_PASSWORD=$EDUMATE_PASSWORD \
  -e POSTGRES_HOST=$POSTGRES_HOST \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  --name edumate-api \
  --log-driver=json-file \
  --log-opt max-size=50m \
  --log-opt max-file=4 \
  --restart=on-failure:5 \
  --memory "512M" \
  -d edumate-api
