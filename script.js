const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const aviao = document.querySelector('.aviao');
const gameOver = document.querySelector('.game-over');

const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 700);
};

const crouch = () => {
  mario.classList.add('crouch');

  setTimeout(() => {
    mario.classList.remove('crouch');
  }, 700);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
  const aviaoPosition = aviao.offsetLeft;

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 100) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './imagens/morrendo.png';
    mario.style.width = '750px';
    mario.style.marginLeft = '0px';

    clearInterval(loop);
    setTimeout(() => {
      gameOver.style.display = 'block';
    }, 1000);
  }

  if (aviaoPosition <= 150 && aviaoPosition > 0 && marioPosition < 100) {
    if (mario.classList.contains('crouch')) {
      mario.classList.remove('crouch');
    } else {
      mario.classList.add('down');
    }
  } else {
    mario.classList.remove('down');
  }

  document.querySelector('.game-over').style.display = 'none';
  gameOver.src = './imagens/over.png';
  $('.game-over').show();

  if (marioPosition > window.innerHeight - mario.offsetHeight) {
    clearInterval(loop);
    setTimeout(() => {
      gameOver.style.display = 'block';
    }, 1000);
  }
}, 10);

document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowUp') {
    jump();
  } else if (event.code === 'ArrowDown') {
    crouch();
  }
});
