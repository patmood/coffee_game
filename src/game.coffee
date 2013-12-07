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
    gfx.ctx.save()
    # Do some tricks
    gfx.ctx.scale 1.3, 1.3
    leftEdge = 210
    offx = if @player.x > leftEdge then -@player.x + leftEdge else 0
    gfx.ctx.translate offx, -@player.y + 130

    @level.render gfx
    @player.render gfx
    backX = 1 - (@player.x / gfx.w) * 100
    backY = 1 - (@player.y / gfx.h) * 100
    gfx.ctx.canvas.style.backgroundPosition = "#{backX}px #{backY}px"

    gfx.ctx.restore()
