// Generated by CoffeeScript 1.6.3
var Block, Dirt, Entity, GameScreen, Gravel, Ladder, Level, Ninja, Player, Rock, Screen, TitleScreen, Treasure, gfx, keys, levels, utils, _ref, _ref1, _ref2, _ref3,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

gfx = {
  init: function() {
    var canvas;
    canvas = $('#game')[0];
    this.ctx = canvas != null ? typeof canvas.getContext === "function" ? canvas.getContext("2d") : void 0 : void 0;
    if (!this.ctx) {
      return false;
    }
    canvas.width = 576;
    canvas.height = 408;
    this.w = canvas.width;
    this.h = canvas.height;
    return true;
  },
  clear: function() {
    return this.ctx.clearRect(0, 0, this.w, this.h);
  },
  load: function(onload) {
    this.title = new Image();
    this.title.src = "resources/title.png";
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

$(document).keydown(function(e) {
  return keys.trigger(e.keyCode, true);
});

$(document).keyup(function(e) {
  return keys.trigger(e.keyCode, false);
});

Screen = (function() {
  function Screen() {}

  Screen.prototype.update = function() {};

  Screen.prototype.render = function(gfx) {};

  return Screen;

})();

TitleScreen = (function(_super) {
  __extends(TitleScreen, _super);

  function TitleScreen() {
    _ref = TitleScreen.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  TitleScreen.prototype.min = 20;

  TitleScreen.prototype.update = function() {
    if (this.min-- > 0) {
      return;
    }
    if (keys.space) {
      return game.screen = new GameScreen();
    }
  };

  TitleScreen.prototype.render = function() {
    var c;
    c = gfx.ctx;
    gfx.clear();
    c.drawImage(gfx.title, 180, 0);
    c.fillStyle = "#e0e0e0";
    c.font = "14pt monospace";
    gfx.drawSprite(5, 1, 480, 180);
    c.fillText("Collect all \"Pig's Boffin\" particles.", 50, 210);
    return c.fillText("Press space to start...", 50, 240);
  };

  return TitleScreen;

})(Screen);

GameScreen = (function(_super) {
  __extends(GameScreen, _super);

  GameScreen.prototype.levelNumber = 0;

  function GameScreen() {
    this.player = new Player();
    this.startLevel();
  }

  GameScreen.prototype.setPlayer = function(x, y, level) {
    this.player.level = level;
    this.player.x = x;
    return this.player.y = y;
  };

  GameScreen.prototype.update = function() {
    this.player.update();
    return this.level.update();
  };

  GameScreen.prototype.startLevel = function() {
    return this.level = new Level(levels[this.levelNumber], this);
  };

  GameScreen.prototype.levelComplete = function() {
    if (++this.levelNumber >= levels.length) {
      return game.win();
    } else {
      return this.startLevel();
    }
  };

  GameScreen.prototype.render = function(gfx) {
    var backX, backY, leftEdge, offx;
    gfx.ctx.save();
    gfx.ctx.scale(1.3, 1.3);
    leftEdge = 210;
    offx = this.player.x > leftEdge ? -this.player.x + leftEdge : 0;
    gfx.ctx.translate(offx, -this.player.y + 130);
    this.level.render(gfx);
    this.player.render(gfx);
    backX = 1 - (this.player.x / gfx.w) * 100;
    backY = 1 - (this.player.y / gfx.h) * 100;
    gfx.ctx.canvas.style.backgroundPosition = "" + backX + "px " + backY + "px";
    return gfx.ctx.restore();
  };

  return GameScreen;

})(Screen);

levels = [
  {
    name: "DIG and BUILD",
    data: "....P.............X..*..\n@-@@.*.......@@@@@@@-@..\n.#..@@@.............#...\n.#.....@@.@@.....X..#...\n@OO#.........#@@...O#..^\n...#.........#......#.^O\n...#..@@-@@@@#..-@@@@@OO\n...#....#....#..#.......\n...#....#....#..#.......\n...#....#....#..#.......\n@-@@OOOOO.#.@@@@@#@@-@@@\n.#.X......#......#..#...\n.#...*....#......#..#...\n####..@@#@@..-@@@@@@@..*\n####....#....#.........#\n####....#....#.........#\nOOOOOOOOOOOOOOOOOOOOOOOO"
  }
];

Level = (function() {
  Level.prototype.w = 0;

  Level.prototype.h = 0;

  Level.prototype.treasures = 0;

  Level.prototype.ninjas = [];

  function Level(level, game) {
    this.game = game;
    this.load(level);
  }

  Level.prototype.load = function(level) {
    var asciiMap, col, row, x, y;
    this.ninjas = [];
    this.treasures = 0;
    asciiMap = (function() {
      var _i, _len, _ref1, _results;
      _ref1 = level.data.split("\n");
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        row = _ref1[_i];
        _results.push(row.split(""));
      }
      return _results;
    })();
    this.map = (function() {
      var _i, _len, _results;
      _results = [];
      for (y = _i = 0, _len = asciiMap.length; _i < _len; y = ++_i) {
        row = asciiMap[y];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
            col = row[x];
            switch (col) {
              case "@":
                _results1.push(new Dirt());
                break;
              case "O":
                _results1.push(new Rock());
                break;
              case "#":
                _results1.push(new Ladder());
                break;
              case "-":
                _results1.push(new Ladder(true));
                break;
              case "*":
                this.treasures++;
                _results1.push(new Treasure());
                break;
              case "P":
                this.addPlayer(x, y);
                _results1.push(new Block());
                break;
              case "X":
                this.addNinja(x, y);
                _results1.push(new Block());
                break;
              default:
                _results1.push(new Block());
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }).call(this);
    this.h = this.map.length;
    return this.w = this.map[0].length;
  };

  Level.prototype.addPlayer = function(x, y) {
    return this.game.setPlayer(x * gfx.tileW, y * gfx.tileH, this);
  };

  Level.prototype.addNinja = function(x, y) {
    var ninja, xPos, yPos;
    xPos = x * gfx.tileW;
    yPos = y * gfx.tileH;
    ninja = new Ninja(this, xPos, yPos, this.game.player);
    return this.ninjas.push(ninja);
  };

  Level.prototype.update = function() {
    var block, ninjas, row, x, y, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref1, _ref2, _ref3, _results;
    _ref1 = this.map;
    for (y = _i = 0, _len = _ref1.length; _i < _len; y = ++_i) {
      row = _ref1[y];
      for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
        block = row[x];
        block.update(x, y, this);
      }
    }
    _ref2 = this.ninjas;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      ninjas = _ref2[_k];
      ninjas.update();
    }
    _ref3 = this.ninjas;
    _results = [];
    for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
      ninjas = _ref3[_l];
      _results.push(this.checkCollision(this.game.player, ninjas));
    }
    return _results;
  };

  Level.prototype.render = function(gfx) {
    var block, ninjas, row, x, y, _i, _j, _k, _len, _len1, _len2, _ref1, _ref2, _results;
    _ref1 = this.map;
    for (y = _i = 0, _len = _ref1.length; _i < _len; y = ++_i) {
      row = _ref1[y];
      for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
        block = row[x];
        block.render(gfx, x * gfx.tileW, y * gfx.tileH);
      }
    }
    _ref2 = this.ninjas;
    _results = [];
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      ninjas = _ref2[_k];
      _results.push(ninjas.render(gfx));
    }
    return _results;
  };

  Level.prototype.getBlockIndex = function(x, y) {
    return [Math.floor(x / gfx.tileW), Math.floor(y / gfx.tileH)];
  };

  Level.prototype.getBlock = function(x, y) {
    var xBlock, yBlock, _ref1, _ref2;
    _ref1 = this.getBlockIndex(x, y), xBlock = _ref1[0], yBlock = _ref1[1];
    return ((_ref2 = this.map[yBlock]) != null ? _ref2[xBlock] : void 0) || new Rock();
  };

  Level.prototype.getBlocks = function() {
    var coords, x, y, _i, _len, _ref1, _results;
    coords = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _results = [];
    for (_i = 0, _len = coords.length; _i < _len; _i++) {
      _ref1 = coords[_i], x = _ref1[0], y = _ref1[1];
      _results.push(this.getBlock(x, y));
    }
    return _results;
  };

  Level.prototype.getBlockEdge = function(position, forVertical) {
    var snapTo;
    if (forVertical == null) {
      forVertical = false;
    }
    snapTo = !forVertical ? gfx.tileW : gfx.tileH;
    return utils.snap(position, snapTo);
  };

  Level.prototype.removeBlock = function(x, y, block) {
    this.map[y][x] = new Block();
    if (block.constructor === Treasure) {
      if (--this.treasures === 0) {
        alert("Level Complete!");
        return this.game.reset();
      }
    }
  };

  Level.prototype.checkCollision = function(p, b) {
    if (p.x + p.w >= b.x && p.x <= b.x + b.w && p.y + p.h >= b.y && p.y <= b.y + b.h) {
      alert("You are dead.");
      return this.game.reset();
    }
  };

  Level.prototype.digAt = function(dir, x, y) {
    var block, xb, yb, _ref1;
    _ref1 = this.getBlockIndex(x, y), xb = _ref1[0], yb = _ref1[1];
    xb = xb + (dir === "RIGHT" ? 1 : -1);
    if (yb + 1 > this.h || xb < 0 || xb > this.w - 1) {
      return;
    }
    block = this.map[yb + 1][xb];
    if (block.digIt != null) {
      block.digIt();
    }
    if (block.constructor === Block) {
      return this.map[yb + 1][xb] = new Gravel();
    }
  };

  return Level;

})();

Block = (function() {
  Block.prototype.solid = false;

  Block.prototype.touchable = false;

  Block.prototype.climbable = false;

  function Block() {}

  Block.prototype.update = function() {};

  Block.prototype.render = function(gfx, x, y) {};

  return Block;

})();

Dirt = (function(_super) {
  __extends(Dirt, _super);

  function Dirt() {
    _ref1 = Dirt.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  Dirt.prototype.solid = true;

  Dirt.prototype.render = function(gfx, x, y) {
    var oldAlpha;
    oldAlpha = gfx.ctx.globalAlpha;
    gfx.ctx.globalAlpha = 1 - this.digTime / 200;
    gfx.drawSprite(4, 1, x, y);
    return gfx.ctx.globalAlpha = oldAlpha;
  };

  Dirt.prototype.update = function() {
    if (--this.digTime === 50) {
      return this.solid = true;
    }
  };

  Dirt.prototype.digIt = function() {
    this.digTime = 200;
    return this.solid = false;
  };

  return Dirt;

})(Block);

Rock = (function(_super) {
  __extends(Rock, _super);

  function Rock() {
    _ref2 = Rock.__super__.constructor.apply(this, arguments);
    return _ref2;
  }

  Rock.prototype.solid = true;

  Rock.prototype.render = function(gfx, x, y) {
    return gfx.drawSprite(4, 0, x, y);
  };

  return Rock;

})(Block);

Ladder = (function(_super) {
  __extends(Ladder, _super);

  Ladder.prototype.climbable = true;

  function Ladder(top) {
    this.top = top;
    this.frame = top ? 6 : 5;
  }

  Ladder.prototype.render = function(gfx, x, y) {
    return gfx.drawSprite(this.frame, 0, x, y);
  };

  return Ladder;

})(Block);

Treasure = (function(_super) {
  __extends(Treasure, _super);

  Treasure.prototype.touchable = true;

  Treasure.prototype.collected = false;

  function Treasure() {
    this.yOff = Math.random() * Math.PI;
  }

  Treasure.prototype.update = function(x, y, level) {
    this.yOff += Math.PI / 24;
    if (this.collected) {
      return level.removeBlock(x, y, this);
    }
  };

  Treasure.prototype.render = function(gfx, x, y) {
    var ySine;
    ySine = Math.floor(Math.sin(this.yOff) * 4);
    return gfx.drawSprite(5, 1, x, y + ySine);
  };

  Treasure.prototype.touch = function(entity) {
    if (entity.constructor === Player) {
      return this.collected = true;
    }
  };

  return Treasure;

})(Block);

Gravel = (function(_super) {
  __extends(Gravel, _super);

  function Gravel() {
    _ref3 = Gravel.__super__.constructor.apply(this, arguments);
    return _ref3;
  }

  Gravel.prototype.solid = true;

  Gravel.prototype.digTime = 200;

  Gravel.prototype.update = function(x, y, level) {
    if (--this.digTime < 0) {
      return level.removeBlock(x, y, this);
    }
  };

  Gravel.prototype.render = function(gfx, x, y) {
    var oldAlpha;
    oldAlpha = gfx.ctx.globalAlpha;
    gfx.ctx.golbalAlpha = this.digTime / 100;
    gfx.drawSprite(4, 2, x, y);
    return gfx.ctx.globalApha = oldAlpha;
  };

  return Gravel;

})(Block);

Entity = (function() {
  Entity.prototype.x = 0;

  Entity.prototype.y = 0;

  Entity.prototype.w = 18;

  Entity.prototype.h = 24;

  Entity.prototype.speed = 4;

  Entity.prototype.dir = "LEFT";

  function Entity(level, x, y) {
    this.level = level;
    this.x = x;
    this.y = y;
    this.falling = true;
    this.wasfalling = true;
    this.onLadder = false;
    this.wasOnLadder = false;
    this.onTopOfLadder = false;
  }

  Entity.prototype.update = function() {};

  Entity.prototype.render = function(gfx) {
    return gfx.ctx.fillText("?", this.x, this.y);
  };

  Entity.prototype.move = function(x, y) {
    var bl, br, tl, tr, xo, xv, yo, yv, _ref4, _ref5;
    if (this.falling) {
      y += this.speed * 2;
    }
    this.wasfalling = this.falling;
    xo = x;
    yo = y;
    xv = this.x + xo;
    yv = this.y + yo;
    _ref4 = this.level.getBlocks([this.x, yv], [this.x, yv + (this.h - 1)], [this.x + (this.w - 1), yv], [this.x + (this.w - 1), yv + (this.h - 1)]), tl = _ref4[0], bl = _ref4[1], tr = _ref4[2], br = _ref4[3];
    if (y < 0 && (tl.solid || tr.solid)) {
      yo = this.level.getBlockEdge(this.y, "VERT") - this.y;
    }
    if (y > 0 && (bl.solid || br.solid)) {
      yo = this.level.getBlockEdge(yv + (this.h - 1), "VERT") - this.y - this.h;
      this.falling = false;
    }
    _ref5 = this.level.getBlocks([this.x, yv], [this.x, yv + (this.h - 1)], [this.x + (this.w - 1), yv], [this.x + (this.w - 1), yv + (this.h - 1)]), tl = _ref5[0], bl = _ref5[1], tr = _ref5[2], br = _ref5[3];
    if (x < 0 && (tl.solid || bl.solid)) {
      xo = this.level.getBlockEdge(this.x) - this.x + this.w;
    }
    if (x > 0 && (tr.solid || br.solid)) {
      xo = this.level.getBlockEdge(xv + (this.w - 1)) - this.x - this.w;
    }
    this.x += xo;
    this.y += yo;
    return this.checkNewPos(x, y);
  };

  Entity.prototype.checkNewPos = function(origX, origY) {
    var bl, block, br, nearBlocks, snapAmount, tl, touchingALadder, tr, _i, _len, _ref4;
    this.wasOnLadder = this.onLadder;
    nearBlocks = (_ref4 = this.level.getBlocks([this.x, this.y], [this.x, this.y + this.h], [this.x + (this.w - 1), this.y], [this.x + (this.w - 1), this.y + this.h]), tl = _ref4[0], bl = _ref4[1], tr = _ref4[2], br = _ref4[3], _ref4);
    for (_i = 0, _len = nearBlocks.length; _i < _len; _i++) {
      block = nearBlocks[_i];
      if (block.touchable) {
        block.touch(this);
      }
    }
    this.onLadder = false;
    touchingALadder = nearBlocks.some(function(block) {
      return block.climbable;
    });
    if (touchingALadder) {
      this.onLadder = true;
      this.falling = false;
      if (origY !== 0) {
        snapAmount = utils.snap(this.x, gfx.tileW);
        if (!(bl.climbable || tl.climbable)) {
          this.x = snapAmount + gfx.tileW;
        }
        if (!(br.climbable || tr.climbable)) {
          this.x = snapAmount;
        }
      }
    }
    this.onTopOfLadder = this.onLadder && !(tl.climbable || tr.climbable) && (this.y + this.h) % gfx.tileH === 0;
    if (!this.falling && !this.onLadder) {
      if (!(bl.solid || br.solid || bl.climbable || br.climbable)) {
        return this.falling = true;
      }
    }
  };

  return Entity;

})();

Player = (function(_super) {
  __extends(Player, _super);

  Player.prototype.lastDig = function() {
    return utils.now();
  };

  function Player() {
    Player.__super__.constructor.apply(this, arguments);
    this.dir = "RIGHT";
  }

  Player.prototype.update = function() {
    var xo, yo;
    xo = yo = 0;
    if (keys.left) {
      xo -= this.speed;
      this.dir = "LEFT";
    }
    if (keys.right) {
      xo += this.speed;
      this.dir = "RIGHT";
    }
    if (keys.space) {
      this.dig();
    }
    if (keys.down && this.onLadder) {
      yo += this.speed;
    }
    if (keys.up && this.onLadder && !this.onTopOfLadder) {
      yo -= this.speed;
    }
    return this.move(xo, yo);
  };

  Player.prototype.render = function(gfx) {
    var fx, fy;
    fy = 0;
    fx = this.dir === "LEFT" ? 2 : 0;
    if (keys.left || keys.right) {
      fx += utils.counter(2);
    }
    if (this.falling) {
      fy = 2;
      fx = this.dir === "LEFT" ? 1 : 0;
    }
    return gfx.drawSprite(fx, fy, this.x, this.y);
  };

  Player.prototype.dig = function() {
    if (utils.now() - this.lastDig < (6 * 1000)) {
      return;
    }
    this.level.digAt(this.dir, this.x, this.y);
    return this.lastDig = utils.now();
  };

  return Player;

})(Entity);

Ninja = (function(_super) {
  __extends(Ninja, _super);

  Ninja.prototype.time = 0;

  function Ninja(level, x, y, player) {
    this.player = player;
    Ninja.__super__.constructor.call(this, level, x, y);
  }

  Ninja.prototype.speed = 3;

  Ninja.prototype.render = function(gfx) {
    var fx;
    fx = this.dir === "LEFT" ? 2 : 0;
    fx += utils.counter(2);
    return gfx.drawSprite(fx, 1, this.x, this.y);
  };

  Ninja.prototype.state = "CRUISING";

  Ninja.prototype.subState = "IDLE";

  Ninja.prototype.cruise = function(px, py) {
    var newMove, x, y;
    if (--this.time < 0) {
      newMove = utils.rand(5);
      this.time = utils.rand(20, 40);
      this.subState = (function() {
        switch (newMove) {
          case 0:
          case 1:
            return "LEFT";
          case 2:
          case 3:
            return "RIGHT";
          default:
            return "IDLE";
        }
      })();
    }
    if (this.onLadder && !this.wasOnLadder) {
      if (Math.random() < 0.5) {
        this.state = "HUNTING";
      }
    }
    if (py === this.y) {
      this.state = "HUNTING";
    }
    x = y = 0;
    switch (this.subState) {
      case "RIGHT":
        x += this.speed;
        this.dir = "RIGHT";
        break;
      case "LEFT":
        x -= this.speed;
        this.dir = "LEFT";
    }
    return [x, y];
  };

  Ninja.prototype.hunt = function(px, py) {
    var x, y;
    x = y = 0;
    if (py === this.y || this.onTopOfLadder) {
      if (px > this.x) {
        x += this.speed;
        this.dir = "RIGHT";
      } else {
        x -= this.speed;
        this.dir = "LEFT";
      }
    } else if (this.onLadder) {
      if (!this.onTopOfLadder && py < this.y) {
        y -= this.speed;
      }
      if (py > this.y) {
        y += this.speed;
      }
    } else {
      this.state = "CRUISING";
      this.subState = "LEFT";
    }
    return [x, y];
  };

  Ninja.prototype.update = function() {
    var px, py, xo, yo, _ref4;
    _ref4 = (function() {
      var _ref4;
      if (this.falling) {
        return [0, 0];
      } else {
        _ref4 = this.player, px = _ref4.x, py = _ref4.y;
        switch (this.state) {
          case "CRUISING":
            return this.cruise(px, py);
          case "HUNTING":
            return this.hunt(px, py);
        }
      }
    }).call(this), xo = _ref4[0], yo = _ref4[1];
    return this.move(xo, yo);
  };

  Ninja.prototype.newMove = function() {};

  return Ninja;

})(Entity);

utils = {
  now: function() {
    return new Date().getTime();
  },
  snap: function(value, snapSize) {
    return Math.floor(value / snapSize) * snapSize;
  },
  rand: function(min, max) {
    var range;
    if (max == null) {
      max = min;
      min = 0;
    }
    range = max - min;
    return Math.floor((Math.random() * range) + min);
  },
  counter: function(max, speed) {
    if (speed == null) {
      speed = 100;
    }
    return Math.floor(this.now() / speed % max);
  }
};

this.game = {
  screen: null,
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
    this.screen = new TitleScreen();
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
    return this.screen.update();
  },
  render: function() {
    return this.screen.render(gfx);
  },
  win: function() {
    return alert("You Won!");
  }
};
