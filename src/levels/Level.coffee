class Level
  w: 0
  h: 0
  treasures: 0
  ninjas: []
  constructor: (level, @game) ->
    @load level
    @addNinja 1, 1
    ninja = @ninjas[0]
    alert "Ninja 1 at: #{ninja.x}, #{ninja.y}"
  load: (level) ->
    # 1. Clear level items
    # 2. Parse the level string into a map
    # 3. Loop over the map and create blocks
    # 4. Set the level height and width
  addNinja: (x, y) ->
    xPos = x * gfx.tileW
    yPos = y * gfx.tileH
    ninja = new Ninja @, xPos, yPos
    @ninjas.push ninja
  update: ->
  render: (gfx) ->
