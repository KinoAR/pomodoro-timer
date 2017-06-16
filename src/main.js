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
        console.log(time);
      }
      if(timeType == 'shortbreak') {
        time =  pomodoroTimer.getShortBreakTime();
      }
      if(timeType == 'longbreak') {
        time =  pomodoroTimer.getLongBreakTime();
      }
      pomodoroTimer.setCurrentTime(time);
      console.log(pomodoroTimer.getCurrentTime());
      this.currentTime = pomodoroTimer.getCurrentTime();
    },
    startTimer() {
      console.log("Timer started");
      this.intervalId = setInterval(() => {
        pomodoroTimer.setCurrentTime(pomodoroTimer.getCurrentTime() - 1);
        this.currentTime = pomodoroTimer.getCurrentTime();
        console.log(pomodoroTimer.getCurrentTime());
      }, 1000);
    },
    stopTimer() {
      console.log("Timer stopped");
      clearInterval(this.intervalId);
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
    showSet1Window: function () {
      let a = !!this.showSettingsWindow;
      return a;
    }
  },
  components: {
    'settings-component': Settings,
  }
});

console.log(app);