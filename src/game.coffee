game =
  init: ->
    if not gfx.init()
      alert "Could not set up game canvas!"
      return # abort game
    gfx.clear
    gfx.load ->
      gfx.drawSprite 0, 0, 100, 50
      drawANinja n for n in ninjas
  rand = (max, min=0) ->
    Math.floor  (Math.random()*(max-min) + min)
  makeANinja = () ->
    x: rand gfx.w
    y: rand gfx.h

  drawANinja = (n) -> gfx.drawSprite 0, 1, n.x, n.y

  ninjas = (makeANinja() for [0..20])

# Start game
game.init()
