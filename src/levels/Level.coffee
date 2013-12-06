class Level
  w: 0
  h: 0
  treasures: 0
  ninjas: []
  constructor: (level, @game) ->
    @load level
  load: (level) ->
    # 1. Clear level items
    @ninjas = []
    @treasures = 0

    # 2. Parse the level string into a map
    asciiMap = (row.split "" for row in level.data.split "\n")

    # 3. Loop over the map and create blocks
    @map = for row, y in asciiMap
      for col, x in row
        switch col
          when "@" then new Dirt()
          when "O" then new Rock()
          when "#" then new Ladder()
          when "-" then new Ladder true
          when "*"
            @treasures++
            new Treasure()
          when "P"
            @addPlayer x, y
            new Block()
          when "X"
            @addNinja x, y
            new Block()
          else new Block()

    # 4. Set the level height and width
    @h = @map.length
    @w = @map[0].length

  addPlayer: (x, y) ->
    @game.setPlayer x * gfx.tileW, y * gfx.tileH, @
  addNinja: (x, y) ->
    xPos = x * gfx.tileW
    yPos = y * gfx.tileH
    ninja = new Ninja @, xPos, yPos
    @ninjas.push ninja
  update: ->
    # Update the level blocks
    for row, y in @map
      for block, x in row
        block.update x, y, @
    ninjas.update() for ninjas in @ninjas
  render: (gfx) ->
    # Render level blocks
    for row, y in @map
      for block, x in row
        block.render gfx, x * gfx.tileW, y * gfx.tileH
    ninjas.render gfx for ninjas in @ninjas
  getBlockIndex: (x, y) -> [
    Math.floor x / gfx.tileW
    Math.floor y / gfx.tileH
  ]
  getBlock: (x, y) ->
    [xBlock, yBlock] = @getBlockIndex x, y
    @map[yBlock]?[xBlock] or new Rock()
  getBlocks: (coords...) -> @getBlock x, y for [x, y] in coords
  getBlockEdge: (position, forVertical = false) ->
    snapTo = if not forVertical then gfx.tileW else gfx.tileH
    utils.snap position, snapTo
  removeBlock: (x, y, block) ->
    @map[y][x] = new Block()
    if block.constructor is Treasure
      if --@treasures == 0
        alert "Level Complete!"
        @game.reset()



























