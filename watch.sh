#!/bin/bash

xargs coffee -w -b -j script/main.js \
             -c << EOF
                src/gfx.coffee
                src/keys.coffee
                src/levels/Level.coffee
                src/entities/_Entity.coffee
                src/entities/Player.coffee
                src/entities/Ninja.coffee
                src/game.coffee
