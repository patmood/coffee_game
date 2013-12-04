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
    @player = new Player 3, 5
    @level = new Level levels[0], @
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
  setPlayer: (x, y, level) ->
    @player.level = level
    @player.x = x
    @player.y = y
  update: ->
    @player.update()
    @level.update()
  render: ->
    @level.render gfx
    @player.render gfx
    ninja1.render gfx

ninja1 = new Ninja gfx.tileW * 4, gfx.tileH * 5
