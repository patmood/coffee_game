class Entity
  x: 0
  y: 0
  w: 18
  h: 24
  speed: 4
  dir: "LEFT"
  constructor: (@level, @x, @y) ->
  update: ->
  render: (gfx) -> gfx.ctx.fillText "?", @x, @y
  move: (x, y) ->
    # 1. Determine the intended position we'll move to
    xo = x
    yo = y
    xv = @x + xo
    yv = @y + yo


    # 2. Check possible block collisions due to vertical movement
    # 3. If collision occurs, move entity back to the edge
    # 4. Check possible block collisions due to horizontal movement
    # 5. If edges overlap, move entity back a little
    # 6. Finally, add the allowed movement to the current position
