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
    @ninjas = []
    @treasures = 0

    # 2. Parse the level string into a map
    asciiMap = (row.split "" for row in level.data.split "\n")

    # 3. Loop over the map and create blocks
    @map = for row, y in asciiMap
      for col, x in row
        switch col
          when "@" then new Dirt()
          when "X"
            @addNinja x, y
            new Block()
          else new Block()

    # 4. Set the level height and width
    @h = @map.length
    @w = @map[0].length

  addNinja: (x, y) ->
    xPos = x * gfx.tileW
    yPos = y * gfx.tileH
    ninja = new Ninja @, xPos, yPos
    @ninjas.push ninja
  update: ->
  render: (gfx) ->
