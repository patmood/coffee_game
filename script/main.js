// Generated by CoffeeScript 1.6.3
var Entity, Ninja, Player, gfx, keys, level1, makeLevel, professor, _ref, _ref1,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

keys = {
  up: false,
  down: false,
  left: false,
  right: false,
  space: false,
  reset: function() {
    return this.up = this.down = this.left = this.right = this.space = false;
  },
  trigger: function(keyCode, isDown) {
    switch (keyCode) {
      case 37:
        return this.left = isDown;
      case 39:
        return this.right = isDown;
      case 38:
        return this.up = isDown;
      case 40:
        return this.down = isDown;
      case 32:
        if (isDown) {
          console.log("Fire Away!");
        }
        return this.space = isDown;
    }
  }
};

document.addEventListener("keydown", function(e) {
  return keys.trigger(e.keyCode, true);
}, false);

document.addEventListener("keyup", function(e) {
  return keys.trigger(e.keyCode, false);
}, false);

Entity = (function() {
  Entity.prototype.speed = 4;

  Entity.prototype.dir = "LEFT";

  function Entity(x, y) {
    this.x = x;
    this.y = y;
  }

  Entity.prototype.update = function() {};

  Entity.prototype.render = function(gfx) {
    return gfx.ctx.fillText("?", this.x, this.y);
  };

  return Entity;

})();

Player = (function(_super) {
  __extends(Player, _super);

  function Player() {
    _ref = Player.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Player.prototype.update = function() {
    if (keys.left) {
      this.x -= this.speed;
    }
    if (keys.right) {
      this.x += this.speed;
    }
    if (keys.down) {
      this.y += this.speed;
    }
    if (keys.up) {
      return this.y -= this.speed;
    }
  };

  Player.prototype.render = function(gfx) {
    return gfx.drawSprite(0, 0, this.x, this.y);
  };

  return Player;

})(Entity);

Ninja = (function(_super) {
  __extends(Ninja, _super);

  function Ninja() {
    _ref1 = Ninja.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  Ninja.prototype.render = function(gfx) {
    return gfx.drawSprite(0, 1, this.x, this.y);
  };

  return Ninja;

})(Entity);

level1 = ".............\n...........*.\n....@#@@@@#@.\n.....#....#..\n.....#....#..\n..*..#...@@@.\n..@@@@@...#..\n...#......#..\n...#......#..\n...#......#..\n.OOOOOOOOOOOO";

makeLevel = function(ascii) {
  var asciiMap, col, row, tiles, _i, _len, _results;
  tiles = {
    "@": [4, 1],
    "O": [4, 0],
    "*": [5, 1],
    "#": [5, 0]
  };
  asciiMap = (function() {
    var _i, _len, _ref2, _results;
    _ref2 = ascii.split("\n");
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      row = _ref2[_i];
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

this.game = {
  running: false,
  init: function() {
    if (!gfx.init()) {
      alert("Sorry, no canvas");
      return;
    }
    return gfx.load(function() {
      return game.reset();
    });
  },
  stop: function() {
    this.running = false;
    return console.log("Stopping...");
  },
  start: function() {
    this.running = true;
    return console.log("Starting...");
  },
  reset: function() {
    keys.reset();
    if (!this.running) {
      this.start();
      return this.tick();
    }
  },
  tick: function() {
    if (!this.running) {
      return;
    }
    gfx.clear();
    this.update();
    this.render();
    return requestAnimationFrame(function() {
      return game.tick();
    });
  },
  update: function() {
    var level, row, tile, x, xPos, y, yPos, _i, _len, _results;
    level = makeLevel(level1);
    professor.update();
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
  },
  render: function() {
    return professor.render(gfx);
  }
};

professor = new Player(gfx.tileW * 3, gfx.tileH * 5);
