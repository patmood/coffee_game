class Entity
  speed: 4
  dir: "LEFT"
  constructor: (@x, @y) ->
  update: ->
  render: (gfx) -> gfx.ctx.fillText "?", @x, @y
