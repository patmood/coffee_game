level1 = """
  .............
  ...........*.
  ....@#@@@@#@.
  .....#....#..
  .....#....#..
  ..*..#...@@@.
  ..@@@@@...#..
  ...#......#..
  ...#......#..
  ...#......#..
  .OOOOOOOOOOOO
"""

makeLevel = (ascii) ->
  tiles =
    "@": [4,1]
    "0": [4,0]
    "*": [5,1]
    "#": [5,0]
  asciiMap = (row.split "" for row in ascii.split "\n")

  (for row in asciiMap
    for col in row
      tiles[col])

game =
  init: ->
    if not gfx.init()
      alert "Could not set up game canvas!"
      return # abort game
    gfx.clear
    gfx.load ->
      gfx.drawSprite 0, 0, 100, 50
      level = makeLevel level1
      for row, y in level
        for tile, x in row
          continue if not tile
          xPos = x * gfx.tileW
          yPos = y * gfx.tileH
          gfx.drawSprite tile[0],tile[1], xPos, yPos

    rand = (max, min=0) ->
      Math.floor  (Math.random()*(max-min) + min)
    makeANinja = () ->
      x: rand gfx.w
      y: rand gfx.h

    drawANinja = (n) -> gfx.drawSprite 0, 1, n.x, n.y

    ninjas = (makeANinja() for [0..20])

# Start game
game.init()
