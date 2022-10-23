import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInput = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > selectedDates[0]) {
      Notiflix.Notify.warning('Please choose a date in the future');
      //   window.alert('Please choose a date in the future');
      startBtn.disabled = true;
    } else if (Date.now() < selectedDates[0]) {
      startBtn.disabled = false;
      console.log(selectedDates[0]);
      localStorage.setItem('target-date', selectedDates[0]);
    }
  },
};

class Countdown {
  constructor() {
    // this.targetDate = targetDate;
    this.intervalId = null;
    this.daysSpan = document.querySelector('[data-days]');
    this.hoursSpan = document.querySelector('[data-hours]');
    this.minutesSpan = document.querySelector('[data-minutes]');
    this.secondsSpan = document.querySelector('[data-seconds]');
  }

  updateTimer() {
    startBtn.disabled = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const delta = new Date(localStorage.getItem('target-date')) - currentTime;
      // console.log(currentTime)
      // console.log(this.targetDate)
      // console.log(delta)
      // console.log(this.convertMs(delta));
      const objTime = this.convertMs(delta);
      this.daysSpan.textContent = objTime.days;
      this.hoursSpan.textContent = objTime.hours;
      this.minutesSpan.textContent = objTime.minutes;
      this.secondsSpan.textContent = objTime.seconds;
      // console.log(objTime);
      if (delta < 0) {
        clearInterval(this.intervalId);
        this.daysSpan.textContent = '00';
        this.hoursSpan.textContent = '00';
        this.minutesSpan.textContent = '00';
        this.secondsSpan.textContent = '00';

        localStorage.removeItem('target-date');
      }
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Countdown();
// targetDate: new Date(localStorage.getItem('target-date')).getTime(),

flatpickr(dateInput, options);

startBtn.addEventListener('click', () => {
  timer.updateTimer();
});
