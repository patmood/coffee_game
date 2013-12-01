#!/bin/bash

xargs coffee -w -b -j script/main.js \
             -c << EOF
                src/gfx.coffee
                src/game.coffee
