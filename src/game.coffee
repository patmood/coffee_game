@game =
  screen: null
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
    @screen = new TitleScreen()
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
  update: ->
    @screen.update()
  render: ->
    @screen.render gfx
  win: -> alert "You Won!"
