'use strict';

var _timer = require('./timer.js');

var _timer2 = _interopRequireDefault(_timer);

var _filter = require('./filter.js');

var _filter2 = _interopRequireDefault(_filter);

var _settings = require('./components/settings.vue');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pTimer = new _timer2.default();

window.pomodoroTimer = pTimer;
var pomodoroTimer = window.pomodoroTimer;

var app = new Vue({
  el: '#app',
  data: {
    title: 'Pomodoro-Timer',
    buttons: [{ title: 'Pomodoro', method: 'hitTest' }, { title: 'Short Break', method: 'hitTest' }, { title: 'Long Break', method: 'hitTest' }],
    currentTime: pomodoroTimer.getCurrentTime(),
    intervalId: null,
    showSettingsWindow: false
  },
  methods: {
    setTime: function setTime(timeType) {
      var time = 0;
      pomodoroTimer.setState(timeType);
      if (timeType == 'pomodoro') {
        time = pomodoroTimer.getPomodoroTime();
      }
      if (timeType == 'shortbreak') {
        time = pomodoroTimer.getShortBreakTime();
      }
      if (timeType == 'longbreak') {
        time = pomodoroTimer.getLongBreakTime();
      }
      console.log(time, timeType);
      pomodoroTimer.setCurrentTime(time);
      this.currentTime = pomodoroTimer.getCurrentTime();
    },
    startTimer: function startTimer() {
      var _this = this;

      console.log("Timer started");
      this.intervalId = setInterval(function () {
        pomodoroTimer.setCurrentTime(pomodoroTimer.getCurrentTime() - 1);
        _this.currentTime = pomodoroTimer.getCurrentTime();
        _this.processTimerStop();
        _this.updateDocumentTitle();
      }, 1000);
    },
    stopTimer: function stopTimer() {
      console.log("Timer stopped");
      clearInterval(this.intervalId);
    },
    updateDocumentTitle: function updateDocumentTitle() {
      if (this.currentTime > 0) {
        var value = this.currentTime;
        var min = Math.floor(value / 60);
        var seconds = value % 60;
        document.title = (min < 10 ? '0' + min : min) + ':' + (seconds < 10 ? '0' + seconds : seconds) + ' - ' + this.title;
      } else {
        document.title = '' + this.title;
      }
    },
    processTimerStop: function processTimerStop() {
      if (pomodoroTimer.getCurrentTime() === 0) {
        this.stopTimer();
        this.updateState();
        this.playAudio();
        this.resetTimer();
      }
    },
    updateState: function updateState() {

      if (pomodoroTimer.getState() === 'pomodoro' && pomodoroTimer.getPomodoroCount() % 4 !== 0) {
        pomodoroTimer.setState('shortbreak');
        pomodoroTimer.setPomodoroCount(pomodoroTimer.getPomodoroCount() + 1);
      } else if (pomodoroTimer.getState() === 'pomodoro' && pomodoroTimer.getPomodoroCount() % 4 == 0) {
        pomodoroTimer.setState('longbreak');
        pomodoroTimer.setPomodoroCount(pomodoroTimer.getPomodoroCount() + 1);
      } else if (pomodoroTimer.getState() === 'shortbreak') pomodoroTimer.setState('pomodoro');else if (pomodoroTimer.getState() === 'longbreak') pomodoroTimer.setState('pomodoro');
    },
    playAudio: function playAudio() {
      var audio = document.getElementById('beeperSound');
      audio.play().catch(console.error);
    },
    resetTimer: function resetTimer() {
      console.log("Timer reset");
      pomodoroTimer.resetTimer();
      this.currentTime = pomodoroTimer.getCurrentTime();
    },
    openSettingsWindow: function openSettingsWindow() {
      this.showSettingsWindow = true;
    },
    closeSettingsWindow: function closeSettingsWindow() {
      this.showSettingsWindow = false;
      console.log("Fired");
    }
  },
  computed: {},
  components: {
    'settings-component': _settings2.default
  }
});

console.log(app);