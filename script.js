// Countdown timer
const timerDigits = document.getElementById('timerDigits');
const startButton = document.getElementById('startButton');
const codeInput = document.getElementById('codeInput');
const defuseButton = document.getElementById('defuseButton');
const result = document.getElementById('result');
const explosionAudio = document.getElementById('explosionAudio');

let countdownTime = 10 * 60; // 5 minutes in seconds
let interval;
let attempts = 3;

function updateCountdown() {
  const hours = Math.floor(countdownTime / 3600);
  const minutes = Math.floor((countdownTime % 3600) / 60);
  const seconds = countdownTime % 60;
  timerDigits.innerText = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function startCountdown() {
  var right=document.getElementById('right-col');
  var bomb=document.createElement('img');
  bomb.setAttribute('src', 'bomb.gif');
      bomb.setAttribute('width', '305px');
      bomb.setAttribute('height', '300px');
  right.appendChild(bomb)
  var iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'https://forms.gle/LyXPguq1bf9WvuDY9');
      iframe.setAttribute('width', '100%');
      iframe.setAttribute('height', '500px');
      iframe.setAttribute('frameborder', '0');
      document.getElementById('instructions').appendChild(iframe);
  updateCountdown();
  interval = setInterval(() => {
    countdownTime--;
    updateCountdown();
    if (countdownTime <= 0) {
      clearInterval(interval);
      result.innerText = 'Boom! Time\'s up.';
      codeInput.disabled = true;
      defuseButton.disabled = true;
      codeForm.removeEventListener('submit', handleFormSubmit);
      explosionAudio.play();

      window.location.replace('eliminated.html');
    }
  }, 1000);
}
  

function handleFormSubmit(event) {
  event.preventDefault();
  const code = codeInput.value.trim();
  if (code === '90634') { // Change this to your desired code
    result.innerText = 'Bomb defused! Tokyo is safe.';
    clearInterval(interval);
    codeInput.disabled = true;
    defuseButton.disabled = true;
    codeForm.removeEventListener('submit', handleFormSubmit);
    window.location.replace('saved.html');
  } else {
    attempts--;
    if (attempts === 0) {
      result.innerText = 'Out of attempts! Boom! Time\'s up.';
      clearInterval(interval);
      codeInput.disabled = true;
      defuseButton.disabled = true;
      codeForm.removeEventListener('submit', handleFormSubmit);
      window.location.replace('eliminated.html');
  
    } else {
      result.innerText = `Wrong code! ${attempts} attempts left. Try again.`;
    }
  }
  codeInput.value = '';
}

startButton.addEventListener('click', function() {
  startCountdown();
  startButton.disabled = true;
  codeForm.addEventListener('submit', handleFormSubmit);
});

// NumPad functionality
document.querySelectorAll('.numpad button').forEach(button => {
  button.addEventListener('click', function() {
    if (codeInput.value.length < 10) {
      codeInput.value += button.textContent;
    }
  });
});
