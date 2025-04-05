let barArray = [];
let isSorting = false;

function generateBars(num = 20) {
    const container = document.getElementById("visualizer");
    container.innerHTML = '';
    barArray = [];
  
    const barWidth = 20;
    const spacing = 4;
    const totalWidth = num * barWidth + (num - 1) * spacing;
    const offsetX = (container.offsetWidth - totalWidth) / 2;
  
    for (let i = 0; i < num; i++) {
      const value = Math.floor(Math.random() * 100) + 1;
  
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = `${value * 2.5}px`;
      bar.dataset.value = value;
      bar.dataset.index = i;
  
      // Calculate position based on offset
      const x = offsetX + i * (barWidth + spacing);
      bar.style.transform = `translateX(${x}px)`;
  
      barArray.push({ el: bar, value, x });
      container.appendChild(bar);
    }
  
    document.getElementById("startBtn").disabled = false;
    isSorting = false;
  }

async function startBubbleSort() {
    const startBtn = document.getElementById("startBtn");
    startBtn.disabled = true;
    isSorting = true;
  
    const n = barArray.length;
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isSorting) {
          startBtn.disabled = false;
          return;
        }
  
        const a = barArray[j];
        const b = barArray[j + 1];
  
        a.el.classList.add("active");
        b.el.classList.add("active");
  
        await sleep(200);
  
        if (a.value > b.value) {
          swapBars(j, j + 1);
          await sleep(300);
        }
  
        a.el.classList.remove("active");
        b.el.classList.remove("active");
      }
    }
  
    startBtn.disabled = false;
    isSorting = false;
  }

  function stopSorting() {
    isSorting = false;
  }  

function swapBars(i, j) {
  // Swap values in the array
  const temp = barArray[i];
  barArray[i] = barArray[j];
  barArray[j] = temp;

  // Swap their X positions visually
  const tempX = barArray[i].x;
  barArray[i].x = barArray[j].x;
  barArray[j].x = tempX;

  barArray[i].el.style.transform = `translateX(${barArray[i].x}px)`;
  barArray[j].el.style.transform = `translateX(${barArray[j].x}px)`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = () => {
  generateBars();
};