class Dirt extends Block
  solid: true
  render: (gfx, x, y) ->
    oldAlpha = gfx.ctx.globalAlpha
    gfx.ctx.globalAlpha = 1 - @digTime / 200
    gfx.drawSprite 4, 1, x, y
    gfx.ctx.globalAlpha = oldAlpha

  update: ->
    @solid = true if --@digTime is 50

  digIt: ->
    @digTime = 200
    @solid = false
