#!/bin/bash

xargs coffee -w -b -j script/main.js -c << EOF
src/gfx.coffee
src/keys.coffee
src/player.coffee
src/game.coffee
