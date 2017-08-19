'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PomodoroTimer = function () {
  function PomodoroTimer() {
    _classCallCheck(this, PomodoroTimer);

    this._pomodoro = 25 * 60;
    this._shortBreak = 5 * 60;
    this._longBreak = 15 * 60;
    this._currentTime = 0;
    this._state = 'pomodoro';
    this._pomodoroCount = 0;
  }

  _createClass(PomodoroTimer, [{
    key: 'setPomodoroTime',
    value: function setPomodoroTime(value) {
      this._pomodoro = this.setTime(value);
    }
  }, {
    key: 'setShortBreakTime',
    value: function setShortBreakTime(value) {
      this._shortBreak = this.setTime(value);
    }
  }, {
    key: 'setLongBreakTime',
    value: function setLongBreakTime(value) {
      this._longBreak = this.setTime(value);
    }
  }, {
    key: 'setTime',
    value: function setTime(value) {
      return value;
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(value) {
      if (this._currentTime >= 0) this._currentTime = this._currentTime + value < 0 ? 0 : value;
    }
  }, {
    key: 'setState',
    value: function setState(state) {
      this._state = state;
    }
  }, {
    key: 'setPomodoroCount',
    value: function setPomodoroCount(count) {
      this._pomodoroCount = count;
    }
  }, {
    key: 'getPomodoroCount',
    value: function getPomodoroCount() {
      return this._pomodoroCount;
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this._state;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this._currentTime;
    }
  }, {
    key: 'getPomodoroTime',
    value: function getPomodoroTime() {
      return this._pomodoro;
    }
  }, {
    key: 'getShortBreakTime',
    value: function getShortBreakTime() {
      return this._shortBreak;
    }
  }, {
    key: 'getLongBreakTime',
    value: function getLongBreakTime() {
      return this._longBreak;
    }
  }, {
    key: 'resetTimer',
    value: function resetTimer() {
      console.log(this._state);
      if (this._state == 'pomodoro') this._currentTime = this._pomodoro;
      if (this._state == 'shortbreak') this._currentTime = this._shortBreak;
      if (this._state == 'longbreak') this._currentTime = this._longBreak;
    }
  }]);

  return PomodoroTimer;
}();

exports.default = PomodoroTimer;