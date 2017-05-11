let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const timerButtons = document.querySelectorAll('[data-time]');
const endTime = document.querySelector('.display__end-time')

function timer(seconds) {
  displayTimeLeft(seconds);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  const display = `${minutes}:${remainder < 10 ? '0' : ''}${remainder}`;
  timerDisplay.textContent = display;
  document.title = display;
  console.log({minutes, remainder})
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const displayHours = hours > 12 ? hours - 12 : hours;
  const minutes = end.getMinutes();
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  endTime.textContent = `Be Back At ${displayHours}:${displayMinutes}`;
}

function beginClock() {
  clearInterval(countdown);
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  clearInterval(countdown);
  timer(mins * 60);
  this.reset();
})

timerButtons.forEach(button => {
  button.addEventListener('click', beginClock)
})
