gfx =
  init: ->
    canvas = $('#game')[0]
    @ctx = canvas?.getContext? "2d"
    return false if not @ctx
    canvas.width = 576
    canvas.height = 408
    @w = canvas.width
    @h = canvas.height
    true

  clear: ->
    @ctx.clearRect 0, 0, @w, @h
  load: (onload) ->
    @title = new Image()
    @title.src = "resources/title.png"
    @sprites = new Image()
    @sprites.src = "resources/sprites.png"
    @sprites.onload = -> onload()
  tileW: 24
  tileH: 24
  drawSprite: (col, row, x, y, w = 1, h = 1, scale = 1) ->
    w *= @tileW
    h *= @tileH
    @ctx.drawImage @sprites, col*w, row*h, w, h, x, y, w * scale, h * scale
