class Player extends Entity
  constructor: ->
    super
    @dir = "RIGHT"
  update: ->
    xo = yo = 0
    if keys.left
      xo -= @speed
      @dir = "LEFT"
    if keys.right
      xo += @speed
      @dir = "RIGHT"
    yo += @speed if keys.down and @onLadder
    yo -= @speed if keys.up and @onLadder and not @onTopOfLadder
    @move(xo, yo)
  render: (gfx) -> gfx.drawSprite 0, 0, @x, @y


