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
    center.x = window.canvas.width / 2;
    center.y = window.canvas.height / 2;

    let intensity = 0;

    window.analyser.getByteFrequencyData(window.dataArray);

    for (let i = 0; i < spikeCount; i++) {
      let spikeHeight = window.dataArray[i];
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
      let data = Math.max(80 - window.dataArray[i], 0);
      window.context.strokeStyle = `rgba(${data}, ${data}, ${data}, 0.5)`;
      window.context.lineWidth = spikeWidth;
      window.context.beginPath();
      window.context.moveTo(spikeStart.x, spikeStart.y);
      window.context.lineTo(spikeEnd.x, spikeEnd.y);
      window.context.stroke();

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
      window.context.fillStyle = 'rgba(255, 255, 255, 0.5)';
      window.context.fillRect(0, 0, window.canvas.width, window.canvas.height);
    }
    if (shockwave < Math.max(window.innerWidth, window.innerHeight)) {
      shockwave += 60;
      rotationRadian += 0.4;
      window.context.lineWidth = 15;
      window.context.strokeStyle = 'white';
      window.context.beginPath();
      window.context.arc(center.x, center.y, shockwave + radius, 0, Math.PI * 2);
      window.context.stroke();
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
