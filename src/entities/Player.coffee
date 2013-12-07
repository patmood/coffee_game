class Player extends Entity
  lastDig: -> return utils.now()
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
    @dig() if keys.space
    yo += @speed if keys.down and @onLadder
    yo -= @speed if keys.up and @onLadder and not @onTopOfLadder
    @move(xo, yo)
  render: (gfx) -> gfx.drawSprite 0, 0, @x, @y
  dig: ->
    # 6 seconds between digging/building ability
    return if utils.now() - @lastDig < (6 * 1000)

    @level.digAt @dir, @x, @y
    @lastDig = utils.now()

