#!/bin/bash

echo "Starting daemonized container: edumate-api-nginx"
docker run -d \
  -p 8877:8877 \
  --net=edumate-api \
  --log-driver=json-file \
  --log-opt max-size=50m \
  --log-opt max-file=4 \
  --restart=on-failure:5 \
  --memory "128M" \
  --name edumate-api-nginx \
  edumate-api-nginx
