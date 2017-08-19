export default class PomodoroTimer {
  constructor() {
    this._pomodoro = 25 * 60;
    this._shortBreak = 5 * 60;
    this._longBreak = 15 * 60;
    this._currentTime = 0;
    this._state = 'pomodoro';
    this._pomodoroCount = 0;
  }

  setPomodoroTime(value) {
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
    if(this._currentTime >= 0)
      this._currentTime = (this._currentTime + value < 0)  ? 0 : value;
  }

  setState(state) {
    this._state = state;
  }

  setPomodoroCount(count) {
    this._pomodoroCount = count;
  }


  getPomodoroCount() {
    return this._pomodoroCount;
  }

  getState() {
    return this._state;
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
    console.log(this._state);
    if(this._state == 'pomodoro')
      this._currentTime = this._pomodoro;
    if(this._state == 'shortbreak')
      this._currentTime = this._shortBreak;
    if(this._state == 'longbreak')
      this._currentTime = this._longBreak;  
  }
}
