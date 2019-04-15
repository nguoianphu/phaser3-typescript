#!/bin/bash

GAME_NAME='flappy-bird'
GAME_PATH="$(pwd)/src/games/${GAME_NAME}"

if [[ -z ${GAME_NAME} ]]; then
	echo "Should provide game-name"
	exit 1
fi

echo "Clean up the deploy"
rm -rf deploy/dist
rm -rf deploy/assets

# mkdir -p deploy/dist
# mkdir -p deploy/assets
cp -R $GAME_PATH/assets deploy/

webpack --mode production --config webpack.deploy.js
