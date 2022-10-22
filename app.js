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
    const color = generateRandomColor();
    const text = col.querySelector('h2');
    text.textContent = color;
    col.style.background = color;
  });
}

setRandomColors();
