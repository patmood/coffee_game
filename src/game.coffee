game =
  init: ->
    if not gfx.init()
      alert "Could not set up game canvas!"
      return # abort game
    gfx.clear
    gfx.load ->
      gfx.drawSprite 0, 0, 100, 50
      drawANinja n for n in ninjas

      # for y in [0..19]
      #   for x in [0..23]
      #     col = 4
      #     row = rand 2
      #     gfx.drawSprite col,row,x*24, y*24
  rand = (max, min=0) ->
    Math.floor  (Math.random()*(max-min) + min)
  makeANinja = () ->
    x: rand gfx.w
    y: rand gfx.h

  drawANinja = (n) -> gfx.drawSprite 0, 1, n.x, n.y

  ninjas = (makeANinja() for [0..20])

# Start game
game.init()


# c = gfx.ctx
# color = Math.floor(Math.random()*360)
# c.fillStyle = "hsl(#{color}, 60%, 50%)"
# c.fillRect 10, 10, 300, 80
# c.strokeStyle = "#3f3f3f"
# c.strokeRect 10, 10, 300, 80
# c.fillStyle = "#202020"
# c.font = "14pt monospace"
# c.fillText "Professon Digman-Runner", 30, 55
