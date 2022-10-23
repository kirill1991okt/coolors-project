window.addEventListener('DOMContentLoaded', () => {
  const columns = document.querySelectorAll('.col');

  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.code.toLocaleLowerCase() === 'space') {
      setRandomColors();
    }
  });

  document.addEventListener('click', (e) => {
    const nameAtr = e.target.dataset.type;
    if (nameAtr === 'lock') {
      const node =
        e.target.tagName.toLocaleLowerCase() === 'i'
          ? e.target
          : e.target.children[0];

      node.classList.toggle('fa-lock-open');
      node.classList.toggle('fa-lock');
    } else if (nameAtr === 'copy') {
      copyToClipboard(e.target.textContent);
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

  function setRandomColors(isInitial) {
    const colorsArr = isInitial ? getColorsFromHash() : [];
    columns.forEach((col, index) => {
      const text = col.querySelector('h2'),
        btn = col.querySelector('button'),
        isLocked = col.querySelector('i').classList.contains('fa-lock');

      if (isLocked) {
        colorsArr.push(text.textContent);
        return;
      }

      const color = isInitial
        ? colorsArr[index]
          ? colorsArr[index]
          : generateRandomColor()
        : generateRandomColor();

      if (!isInitial) {
        colorsArr.push(color);
      }
      text.textContent = color;
      col.style.background = color;
      setTextColor(text, color);
      setTextColor(btn, color);
    });

    updateColorHash(colorsArr);
  }

  function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? '#000' : '#fff';
  }

  function copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
  }

  function updateColorHash(colors = []) {
    document.location.hash = colors.map((color) => color.slice(1)).join('-');
  }

  function getColorsFromHash() {
    if (document.location.hash.length > 1) {
      return document.location.hash
        .substring(1)
        .split('-')
        .map((item) => '#' + item);
    }

    return [];
  }

  // написать функцию для открытия модального окна и закрытия
  // можно добавить окно, которое подсказывает что для смены цвета необходимо нажимать на пробел

  setRandomColors(true);
});
