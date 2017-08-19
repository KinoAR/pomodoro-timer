import PomodoroTimer from './timer.js';
const pTimer = new PomodoroTimer();
import Filter from './filter.js';
import Settings from './components/settings.vue';
window.pomodoroTimer = pTimer;
const pomodoroTimer = window.pomodoroTimer;

const app = new Vue({
  el: '#app',
  data: {
    title: 'Pomodoro-Timer',
    buttons: [
    { title: 'Pomodoro', method: 'hitTest' },
    { title: 'Short Break', method: 'hitTest' },
    { title: 'Long Break', method: 'hitTest' }],
    currentTime: pomodoroTimer.getCurrentTime(),
    intervalId: null,
    showSettingsWindow: false,
  },
  methods: {
    setTime(timeType) {
      let time = 0;
      pomodoroTimer.setState(timeType);
      if(timeType == 'pomodoro') {
        time = pomodoroTimer.getPomodoroTime();
      }
      if(timeType == 'shortbreak') {
        time =  pomodoroTimer.getShortBreakTime();
      }
      if(timeType == 'longbreak') {
        time =  pomodoroTimer.getLongBreakTime();
      }
      console.log(time, timeType);
      pomodoroTimer.setCurrentTime(time);
      this.currentTime = pomodoroTimer.getCurrentTime();
    },
    startTimer() {
      console.log("Timer started");
      this.intervalId = setInterval(() => {
        pomodoroTimer.setCurrentTime(pomodoroTimer.getCurrentTime() - 1);
        this.currentTime = pomodoroTimer.getCurrentTime();
        this.processTimerStop();
        this.updateDocumentTitle();
      }, 1000);
    },
    stopTimer() {
      console.log("Timer stopped");
      clearInterval(this.intervalId);
    }, 
    updateDocumentTitle() {
      if(this.currentTime > 0) {
        const value = this.currentTime;
        let min = Math.floor(value / 60);
        let seconds = value % 60;
        document.title = `${ (min < 10) ? '0' + min : min }:${ (seconds < 10) ? '0' + seconds : seconds } - ${this.title}`;
      } else {
        document.title = `${this.title}`;
      }
    },
    processTimerStop() {
      if(pomodoroTimer.getCurrentTime() === 0) {
        this.stopTimer();
        this.updateState();
        this.playAudio();
        this.resetTimer();
      }
    },
    updateState() {
      if(pomodoroTimer.getState() === 'pomodoro')
        pomodoroTimer.setPomodoroCount(pomodoroTimer.getPomodoroCount() + 1);

      if(pomodoroTimer.getState() === 'pomodoro' && pomodoroTimer.getPomodoroCount() % 4 !== 0) {
        pomodoroTimer.setState('shortbreak');
      } else if(pomodoroTimer.getState() === 'pomodoro' && pomodoroTimer.getPomodoroCount() % 4 == 0) {
        pomodoroTimer.setState('longbreak');
      }
      else if(pomodoroTimer.getState() === 'shortbreak')
        pomodoroTimer.setState('pomodoro');
      else if(pomodoroTimer.getState() === 'longbreak')
        pomodoroTimer.setState('pomodoro');
    },
    playAudio() {
      const audio = document.getElementById('beeperSound');
      audio.play().catch(console.error);
    },
    resetTimer() {
      console.log("Timer reset");
      pomodoroTimer.resetTimer();
      this.currentTime = pomodoroTimer.getCurrentTime();
    }, 
    openSettingsWindow() {
      this.showSettingsWindow = true;
    },
    closeSettingsWindow() {
      this.showSettingsWindow = false;
      console.log("Fired");
    }
  },
  computed: {

  },
  components: {
    'settings-component': Settings,
  }
});

console.log(app);