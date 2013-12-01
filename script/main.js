// Generated by CoffeeScript 1.6.3
var game, gfx, level1, makeLevel;

gfx = {
  init: function() {
    var canvas;
    canvas = document.querySelector("#game");
    this.ctx = canvas != null ? typeof canvas.getContext === "function" ? canvas.getContext("2d") : void 0 : void 0;
    if (!this.ctx) {
      return false;
    }
    canvas.width = 800;
    canvas.height = 400;
    this.w = canvas.width;
    this.h = canvas.height;
    return true;
  },
  clear: function() {
    return this.ctx.clearRect(0, 0, this.w, this.h);
  },
  load: function(onload) {
    this.sprites = new Image();
    this.sprites.src = "resources/sprites.png";
    return this.sprites.onload = function() {
      return onload();
    };
  },
  tileW: 24,
  tileH: 24,
  drawSprite: function(col, row, x, y, w, h, scale) {
    if (w == null) {
      w = 1;
    }
    if (h == null) {
      h = 1;
    }
    if (scale == null) {
      scale = 1;
    }
    w *= this.tileW;
    h *= this.tileH;
    return this.ctx.drawImage(this.sprites, col * w, row * h, w, h, x, y, w * scale, h * scale);
  }
};

level1 = ".............\n...........*.\n....@#@@@@#@.\n.....#....#..\n.....#....#..\n..*..#...@@@.\n..@@@@@...#..\n...#......#..\n...#......#..\n...#......#..\n.OOOOOOOOOOOO";

makeLevel = function(ascii) {
  var asciiMap, col, row, tiles, _i, _len, _results;
  tiles = {
    "@": [4, 1],
    "0": [4, 0],
    "*": [5, 1],
    "#": [5, 0]
  };
  asciiMap = (function() {
    var _i, _len, _ref, _results;
    _ref = ascii.split("\n");
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      row = _ref[_i];
      _results.push(row.split(""));
    }
    return _results;
  })();
  _results = [];
  for (_i = 0, _len = asciiMap.length; _i < _len; _i++) {
    row = asciiMap[_i];
    _results.push((function() {
      var _j, _len1, _results1;
      _results1 = [];
      for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
        col = row[_j];
        _results1.push(tiles[col]);
      }
      return _results1;
    })());
  }
  return _results;
};

game = {
  init: function() {
    var drawANinja, makeANinja, ninjas, rand;
    if (!gfx.init()) {
      alert("Could not set up game canvas!");
      return;
    }
    gfx.clear;
    gfx.load(function() {
      var level, row, tile, x, xPos, y, yPos, _i, _len, _results;
      gfx.drawSprite(0, 0, 100, 50);
      level = makeLevel(level1);
      _results = [];
      for (y = _i = 0, _len = level.length; _i < _len; y = ++_i) {
        row = level[y];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
            tile = row[x];
            if (!tile) {
              continue;
            }
            xPos = x * gfx.tileW;
            yPos = y * gfx.tileH;
            _results1.push(gfx.drawSprite(tile[0], tile[1], xPos, yPos));
          }
          return _results1;
        })());
      }
      return _results;
    });
    rand = function(max, min) {
      if (min == null) {
        min = 0;
      }
      return Math.floor(Math.random() * (max - min) + min);
    };
    makeANinja = function() {
      return {
        x: rand(gfx.w),
        y: rand(gfx.h)
      };
    };
    drawANinja = function(n) {
      return gfx.drawSprite(0, 1, n.x, n.y);
    };
    return ninjas = (function() {
      var _i, _results;
      _results = [];
      for (_i = 0; _i <= 20; _i++) {
        _results.push(makeANinja());
      }
      return _results;
    })();
  }
};

game.init();
