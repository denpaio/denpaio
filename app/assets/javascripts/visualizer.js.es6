var canvas, ctx, dataArray, analyser, drawVisual;

(function() {
  var center_x, center_y, radius, radius_old, deltarad, shockwave,
    bars, bar_x, bar_y, bar_x_term, bar_y_term, bar_width,
    bar_height, react_x, react_y, intensity, rot;

  bars = 200;
  react_x = 0;
  react_y = 0;
  radius = 100;
  radius_old = 100;
  deltarad = 0;
  shockwave = 1024;
  rot = 0;
  intensity = 0;

  function resize_canvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.frameLooper = function () {
    resize_canvas();

    ctx.fillStyle = 'rgba(255, 255, 255, ' + (intensity * 0.0000125 - 0.4) + ')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    rot = rot + intensity * 0.0000001;

    react_x = 0;
    react_y = 0;

    intensity = 0;

    analyser.getByteFrequencyData(dataArray);

    for (var i = 0; i < bars; i++) {
      let rads = Math.PI * 2 / bars;

      bar_x = center_x;
      bar_y = center_y;

      bar_height = Math.min(99999, Math.max((dataArray[i] * 2.5 - 200), 0));
      bar_width = bar_height * 0.02;

      bar_x_term = center_x + Math.cos(rads * i + rot) * (radius + bar_height);
      bar_y_term = center_y + Math.sin(rads * i + rot) * (radius + bar_height);

      ctx.save();

      let n = Math.max(128 - dataArray[i], 0);
      var lineColor = `rgba(${n}, ${n}, ${n}, 0.5)`;

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = bar_width;
      ctx.beginPath();
      ctx.moveTo(bar_x, bar_y);
      ctx.lineTo(bar_x_term, bar_y_term);
      ctx.stroke();

      react_x += Math.cos(rads * i + rot) * (radius + bar_height);
      react_y += Math.sin(rads * i + rot) * (radius + bar_height);

      intensity += bar_height;
    }

    center_x = canvas.width / 2 - (react_x * 0.007);
    center_y = canvas.height / 2 - (react_y * 0.007);

    radius_old = radius;
    radius = 25 + (intensity * 0.002);
    deltarad = radius - radius_old;

    // shockwave effect      
    shockwave += 60;

    ctx.lineWidth = 15;
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.beginPath();
    ctx.arc(center_x, center_y, shockwave + radius, 0, Math.PI * 2, false);
    ctx.stroke();

    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(center_x, center_y, (radius + 2) * 2, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();

    if (deltarad > 20) {
      shockwave = 0;
      document.querySelector('#denpaio-app').style.transform = 'scale(1.1)';

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rot = rot + 0.4;
    }

    drawVisual = requestAnimationFrame(window.frameLooper);
  };
})();
