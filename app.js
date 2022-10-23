window.addEventListener('DOMContentLoaded', () => {
  const columns = document.querySelectorAll('.col');

  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.code.toLocaleLowerCase() === 'space') {
      setRandomColors();
    }
  });

  document.addEventListener('click', (e) => {
    const lock = e.target.dataset.type;
    if (lock === 'lock') {
      const node =
        e.target.tagName.toLocaleLowerCase() === 'i'
          ? e.target
          : e.target.children[0];

      node.classList.toggle('fa-lock-open');
      node.classList.toggle('fa-lock');
    }
  });

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
        btn = col.querySelector('button'),
        isLocked = col.querySelector('i').classList.contains('fa-lock');

      if (isLocked) {
        return;
      }

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
});
