class Ninja extends Entity
  time: 0
  constructor: (level, x, y, @player) -> super level, x, y
  speed: 3
  render: (gfx) -> gfx.drawSprite 0, 1, @x, @y
  state: "CRUISING"
  subState: "IDLE"
  cruise: (px, py) ->
    if --@time < 0
      newMove = utils.rand 5
      @time = utils.rand 20, 40
      @substate = switch newMove
        when 0, 1 then "LEFT"
        when 2, 3 then "RIGHT"
        else "IDLE"
    x = y = 0
    # Cruising Logic
    switch @subState
      when "RIGHT"
        x += @speed
        @dir = "RIGHT"
      when "LEFT"
        x -= @speed
        @dir = "LEFT"
    [x, y]
  hunt: (px, py) ->
    x = y = 0
    # Hunting logic
    [x, y]
  update: ->
    [xo, yo] = if @falling then [0, 0] else
      {x: px, y: py} = @player # Coffee magic
      switch @state
        when "CRUISING" then @cruise px, py
        when "HUNTING" then @hunt px, py
    @move xo, yo

