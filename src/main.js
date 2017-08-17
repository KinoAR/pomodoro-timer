import PomodoroTimer from './timer.js';
const pomodoroTimer = new PomodoroTimer();
import Filter from './filter.js';
import Settings from './components/settings.vue';
window.pomodoroTimer = pomodoroTimer;

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
        this.processTimerStop(pomodoroTimer);
      }, 1000);
    },
    stopTimer() {
      console.log("Timer stopped");
      clearInterval(this.intervalId);
    }, 
    processTimerStop(timer) {
      if(timer.getCurrentTime() === 0) {
        this.stopTimer();
        this.updateState(pomodoroTimer);
        this.playAudio();
        this.resetTimer();
      }
    },
    updateState(timer) {
      if(pomodoroTimer.getState() === 'pomodoro')
        pomodoroTimer.setState('shortbreak');
      if(pomodoroTimer.getState() === 'shortbreak')
        pomodoroTimer.setState('pomodoro');
      if(pomodoroTimer.getState() === 'longbreak')
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