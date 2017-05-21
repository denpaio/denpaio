var canvas, context, analyser, dataArray;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

(function() {
  var radius = 0;
  var oldRadius = 0;
  var shockwave = Math.max(window.innerWidth, window.innerHeight);
  var center = new Point(0, 0);
  var rotationRadian = 0;

  const spikeCount = 180;
  const macSpikeHeight = 255;
  const maxIntensity = spikeCount * macSpikeHeight;
  const radian = Math.PI * 2 / spikeCount;

  window.draw = function () {
    window.drawVisual = requestAnimationFrame(window.draw);
    window.canvas.width = window.innerWidth;
    window.canvas.height = window.innerHeight;
    center.x = canvas.width / 2;
    center.y = canvas.height / 2;

    let intensity = 0;

    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < spikeCount; i++) {
      let spikeHeight = dataArray[i];
      let spikeWidth = Math.PI * 2 * radius / spikeCount * 0.8; // smaller than radian width

      let spikeStart = new Point(
        center.x + Math.cos(radian * i + rotationRadian) * radius,
        center.y + Math.sin(radian * i + rotationRadian) * radius
      );

      let spikeEnd = new Point(
        center.x + Math.cos(radian * i + rotationRadian) * (radius + spikeHeight / 2),
        center.y + Math.sin(radian * i + rotationRadian) * (radius + spikeHeight / 2),
      );

      // Draw a spike
      let data = Math.max(80 - dataArray[i], 0);
      context.strokeStyle = `rgba(${data}, ${data}, ${data}, 0.5)`;
      context.lineWidth = spikeWidth;
      context.beginPath();
      context.moveTo(spikeStart.x, spikeStart.y);
      context.lineTo(spikeEnd.x, spikeEnd.y);
      context.stroke();

      intensity += spikeHeight;
    }

    // Radius calculation
    let shorterSideLength = Math.min(window.innerWidth, window.innerHeight);
    oldRadius = radius;
    radius = intensity / maxIntensity * shorterSideLength / 2;

    // Shockwave effects
    if (radius - oldRadius > shorterSideLength / 15) {
      document.getElementById('denpaio-app').style.transform = 'scale(1.1)';
      shockwave = 0;
      context.fillStyle = 'rgba(255, 255, 255, 0.5)';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    if (shockwave < Math.max(window.innerWidth, window.innerHeight)) {
      shockwave += 60;
      rotationRadian += 0.4;
      context.lineWidth = 15;
      context.strokeStyle = 'white';
      context.beginPath();
      context.arc(center.x, center.y, shockwave + radius, 0, Math.PI * 2);
      context.stroke();
    }

    // Recurring parameters
    rotationRadian += 0.002;
  };
})();

function initializeVisualizer() {
  window.canvas = document.getElementById('visualizer_render');
  window.canvas.width = window.innerWidth;
  window.canvas.height = window.innerHeight;
  window.context = window.canvas.getContext('2d');
}

window.addEventListener('load', initializeVisualizer);
window.addEventListener('resize', initializeVisualizer);
