const columns = document.querySelectorAll('.col');

function generateRandomColor() {
  const hexCode = '1234567890abcdef';
  let color = '';

  for (let i = 0; i < 6; i++) {
    color += hexCode[Math.floor(Math.random() * hexCode.length)];
  }

  return '#' + color;
}

function setRandomColors() {
  columns.forEach((col) => {
    const color = generateRandomColor(),
      text = col.querySelector('h2'),
      btn = col.querySelector('button');

    text.textContent = color;
    col.style.background = color;
    setTextColor(text, color);
    setTextColor(btn, color);
  });
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? '#000' : '#fff';
}

setRandomColors();
