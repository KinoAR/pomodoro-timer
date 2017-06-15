export default class PomodoroTimer {
  constructor() {
    this._pomodoro = 25 * 60;
    this._shortBreak = 5 * 60;
    this._longBreak = 15 * 60;
    this._currentTime = 0;
    this._state = 'pomodoro';
  }

  setPomodoroTime(value) {
    console.log(value);
    this._pomodoro = this.setTime(value);
  } 
  
  setShortBreakTime(value) {
    this._shortBreak = this.setTime(value);
  }

  setLongBreakTime(value) {
    this._longBreak = this.setTime(value);
  }

  setTime(value) {
    return value;
  }

  setCurrentTime(value) {
    this._currentTime = value;
  }

  setState(state) {
    this._state = state;
  }

  getCurrentTime() {
    return this._currentTime;
  }

  getPomodoroTime() {
    return this._pomodoro;
  }

  getShortBreakTime() {
    return this._shortBreak;
  }

  getLongBreakTime() {
    return this._longBreak;
  }

  resetTimer() {
    if(this._state == 'pomodoro')
      this._currentTime = this._pomodoro;
    if(this._state == 'shortbreak')
      this._currentTime = this._shortBreak;
    if(this._state == 'longbreak')
      this._currentTime = this._longBreak;  
  }
}
