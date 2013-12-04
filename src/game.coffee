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
    "O": [4,0]
    "*": [5,1]
    "#": [5,0]
  asciiMap = (row.split "" for row in ascii.split "\n")

  (for row in asciiMap
    for col in row
      tiles[col])

# game =
#   init: ->
#     if not gfx.init()
#       alert "Could not set up game canvas!"
#       return # abort game
#     gfx.clear
#     gfx.load ->
#       gfx.drawSprite 0, 0, 100, 50
#       level = makeLevel level1

#       # Basic Game Loop
#       setInterval ->
#         # run game things
#         player.update()
#         gfx.clear()

#         # draw the level
#         for row, y in level
#           for tile, x in row
#             continue if not tile
#             xPos = x * gfx.tileW
#             yPos = y * gfx.tileH
#             gfx.drawSprite tile[0],tile[1], xPos, yPos

#         player.render(gfx)
#       , 33


#     rand = (max, min=0) ->
#       Math.floor  (Math.random()*(max-min) + min)
#     makeANinja = () ->
#       x: rand gfx.w
#       y: rand gfx.h

#     drawANinja = (n) -> gfx.drawSprite 0, 1, n.x, n.y

#     ninjas = (makeANinja() for [0..20])

@game =
  running: false
  init: ->
    if not gfx.init()
      alert "Sorry, no canvas"
      return
    gfx.load -> game.reset()
  stop: ->
    @running = false
    console.log "Stopping..."
  start: ->
    @running = true
    console.log "Starting..."
  reset: ->
    keys.reset()
    if not @running
      @start()
      @tick()
  tick: ->
    return if not @running
    gfx.clear()
    @update()
    @render()
    requestAnimationFrame ->
      game.tick()
  update: ->
    level = makeLevel level1
    player.update()
    for row, y in level
      for tile, x in row
        continue if not tile
        xPos = x * gfx.tileW
        yPos = y * gfx.tileH
        gfx.drawSprite tile[0],tile[1], xPos, yPos
  render: ->
    player.render gfx
    ninja1.render gfx

player = new Player gfx.tileW * 3, gfx.tileH * 5
ninja1 = new Ninja gfx.tileW * 4, gfx.tileH * 5
