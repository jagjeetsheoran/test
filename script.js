const button = document.querySelector('.ripple-button');

button.addEventListener('click', function (e) {
  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  this.appendChild(ripple);

  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
});
