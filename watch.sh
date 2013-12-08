#!/bin/bash

xargs coffee -w -b -j script/main.js \
             -c << EOF
                src/gfx.coffee
                src/keys.coffee
                src/screens/_Screen.coffee
                src/screens/TitleScreen.coffee
                src/screens/GameScreen.coffee
                src/levels/levels.coffee
                src/levels/Level.coffee
                src/blocks/Block.coffee
                src/blocks/Dirt.coffee
                src/blocks/Rock.coffee
                src/blocks/Ladder.coffee
                src/blocks/Treasure.coffee
                src/blocks/Gravel.coffee
                src/entities/_Entity.coffee
                src/entities/Player.coffee
                src/entities/Ninja.coffee
                src/_utils.coffee
                src/game.coffee
