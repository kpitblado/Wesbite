function generateBars(num = 20) {
    const container = document.getElementById('visualizer');
    container.innerHTML = '';
  
    const values = [];
    for (let i = 0; i < num; i++) {
      const value = Math.floor(Math.random() * 100) + 1;
      values.push(value);
  
      const bar = document.createElement('div');
      bar.classList.add('bar');
      bar.style.height = `${value * 2.5}px`;
      bar.dataset.value = value;
      container.appendChild(bar);
    }
  }
  
  async function startBubbleSort() {
    const bars = document.querySelectorAll('.bar');
  
    for (let i = 0; i < bars.length; i++) {
      for (let j = 0; j < bars.length - i - 1; j++) {
        const a = bars[j];
        const b = bars[j + 1];
  
        a.classList.add('active');
        b.classList.add('active');
  
        await sleep(100);
  
        const valA = parseInt(a.dataset.value);
        const valB = parseInt(b.dataset.value);
  
        if (valA > valB) {
          swapHeights(a, b);
          swapData(a, b);
        }
  
        a.classList.remove('active');
        b.classList.remove('active');
      }
    }
  }
  
  function swapHeights(el1, el2) {
    const temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
  }
  
  function swapData(el1, el2) {
    const temp = el1.dataset.value;
    el1.dataset.value = el2.dataset.value;
    el2.dataset.value = temp;
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Generate bars on page load
  window.onload = () => {
    generateBars();
  };