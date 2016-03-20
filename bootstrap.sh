#!/bin/sh

# Colours, Formatting, Variables
DOCKER_NETWORK_DRIVER="bridge"
DOCKER_NETWORK_NAME="edumate-api"
DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
. "$DIR/colours.sh"

# Welcome message
clear
echo ""
echo "You are about to begin bootstrapping the edumate-api environment. This script will:"
echo ""
sleep 0.5s
echo " - Check for the presence of docker"
sleep 0.10s
echo " - Check for the presence of the docker network"
sleep 0.10s
echo " - Check that the required environment variables are set"
sleep 0.10s
echo " - Build and run the RethinkDB container"
sleep 0.10s
echo " - Build and run the node container"
sleep 0.10s
echo " - Build and run the nginx container"
sleep 0.10s
echo ""
read -p "   Press [Enter] to begin."
echo ""

# Check for docker client
if hash docker 2>/dev/null; then
  echo "${RUNE_OK} `docker --version` is installed."
  echo ""
  sleep 0.5s
else
  echo "${RUNE_ERROR} docker is not installed! Exiting."
  sleep 0.5s
  exit 1
fi

# Check for docker network
if docker network ls | grep -q ${DOCKER_NETWORK_NAME} 2>/dev/null; then
  echo "${RUNE_INFO} ${FG_BLUE}Docker network: \"$DOCKER_NETWORK_NAME\" exists. Continuing.${RESET}"
  echo ""
else
  echo "${RUNE_INFO} ${FG_BLUE}Creating Docker network: \"$DOCKER_NETWORK_NAME\" using the \"$DOCKER_NETWORK_DRIVER\" driver.${RESET}"
  echo ""
  sleep 2s
  docker network create --driver $DOCKER_NETWORK_DRIVER $DOCKER_NETWORK_NAME
fi

# Check environment variable presence
if [ -z "$RETHINKDB_HOST" ] || [ -z "$RETHINKDB_PORT" ] || [ -z "$EDUMATE_API_HTTP_PORT" ] || [ -z "$EDUMATE_HOST" ] || [ -z "$EDUMATE_PORT" ] || [ -z "$EDUMATE_PATH" ] || [ -z "$EDUMATE_USERNAME" ] || [ -z "$EDUMATE_PASSWORD" ]; then

  if [ -z "$RETHINKDB_HOST" ]; then
    echo "RETHINKDB_HOST is not set! Please set it and re-run this script."
  fi

  if [ -z "$RETHINKDB_PORT" ]; then
    echo "RETHINKDB_PORT is not set! Please set it and re-run this script."
  fi

  if [ -z "$POSTGRES_PASSWORD" ]; then
    echo "POSTGRES_PASSWORD is not set! Please set it and re-run this script."
  fi

  if [ -z "$EDUMATE_API_HTTP_PORT" ]; then
    echo "EDUMATE_API_HTTP_PORT is not set! Please set it and re-run this script."
  fi

  if [ -z "$EDUMATE_HOST" ]; then
    echo "EDUMATE_HOST is not set! Please set it and re-run this script."
  fi

  if [ -z "$EDUMATE_PORT" ]; then
    echo "EDUMATE_PORT is not set! Please set it and re-run this script."
  fi

  if [ -z "$EDUMATE_PATH" ]; then
    echo "EDUMATE_PATH is not set! Please set it and re-run this script."
  fi

  if [ -z "$EDUMATE_USERNAME" ]; then
    echo "EDUMATE_USERNAME is not set! Please set it and re-run this script."
  fi

  if [ -z "$EDUMATE_PASSWORD" ]; then
    echo "EDUMATE_PASSWORD is not set! Please set it and re-run this script."
  fi
  exit 1
else
  echo "${RUNE_OK} Environment variables are all set!"
  echo ""
fi

echo "${RUNE_OK} Pre-flight check complete."
echo ""
sleep 1s

echo "${RUNE_INFO} ${FG_BLUE}Building and running RethinkDB container.${RESET}"
cd rethinkdb
./build.sh
./run.sh
cd ..
sleep 1s

echo "${RUNE_INFO} ${FG_BLUE}Building and running app container.${RESET}"
cd app
./build.sh
./run.sh
cd ..
sleep 1s

echo "${RUNE_INFO} ${FG_BLUE}Building and running nginx container.${RESET}"
cd nginx
./build.sh
./run.sh
cd ..
sleep 1s

echo "${RUNE_OK} Bootstrapping complete.${RESET}"
