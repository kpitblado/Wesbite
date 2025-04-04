const canvas = document.getElementById("needleCanvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
const lineSpacing = 50;
const needleLength = 40;

let totalNeedles = 0;
let crossCount = 0;

// Draw parallel lines
function drawLines() {
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 1;
  for (let y = lineSpacing; y < height; y += lineSpacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

// Draw a single needle
function drawNeedle(x, y, angle, crosses) {
  const x1 = x - (needleLength / 2) * Math.cos(angle);
  const y1 = y - (needleLength / 2) * Math.sin(angle);
  const x2 = x + (needleLength / 2) * Math.cos(angle);
  const y2 = y + (needleLength / 2) * Math.sin(angle);

  ctx.strokeStyle = crosses ? "#b8860b" : "#640764";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// Drop a batch of needles
function dropNeedles(n = 100) {
    console.log("Button clicked – dropping needles...");
  if (!ctx) return;

  for (let i = 0; i < n; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const angle = Math.random() * Math.PI;

    // Check if needle crosses a line
    const y1 = y - (needleLength / 2) * Math.sin(angle);
    const y2 = y + (needleLength / 2) * Math.sin(angle);
    const crosses = Math.floor(y1 / lineSpacing) !== Math.floor(y2 / lineSpacing);

    if (crosses) crossCount++;
    totalNeedles++;

    drawNeedle(x, y, angle, crosses);
  }

  const piEstimate = (2 * needleLength * totalNeedles) / (lineSpacing * crossCount);
  document.getElementById("piEstimate").textContent = `
    Needles: ${totalNeedles} | Crosses: ${crossCount} | π ≈ ${piEstimate.toFixed(6)}
  `;
}

drawLines();