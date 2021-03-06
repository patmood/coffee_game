// Generated by CoffeeScript 1.6.3
(function() {
  var ctx, noise;

  ctx = document.getElementById("game").getContext("2d");

  ctx.fillStyle = "#000";

  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  noise = function() {
    var color, x, y, _i, _results;
    _results = [];
    for (x = _i = 0; _i <= 20; x = ++_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (y = _j = 0; _j <= 10; y = ++_j) {
          color = Math.floor(Math.random() * 360);
          ctx.fillStyle = "hsl(" + color + ", 60%, 50%)";
          _results1.push(ctx.fillRect(x * 15, y * 15, 14, 14));
        }
        return _results1;
      })());
    }
    return _results;
  };

  setInterval(noise, 100);

}).call(this);
