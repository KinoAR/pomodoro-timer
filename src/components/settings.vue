<template>
  <div v-if="showWindow" class="settings">
    <div class="row close-button justify-content-end"> 
      <div class="col align-self-end">
        <button v-on:click="closeWindow" class="btn btn-warning" type="button">  <i class="fa fa-times" aria-hidden="true"></i> </button>
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <h2> Options </h2>
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <form>
          <div class="form-group">
            <label for="exampleSelect1">Voulume Control </label>
            <select class="form-control" id="volumeControl">
              <option>25%</option>
              <option>50%</option>
              <option>75%</option>
              <option>100%</option>
            </select>
          </div>
          <div class="input-group">
            <div class="col">
              <label for="Pomodoro Length"> Pomodoro Length </label>
              <input id="pomodoroLength" type="number" class="form-control full-width" value="25">
            </div>
            <div class="col">
              <label for="Break Time"> Short Break </label>
              <input id="shortBreakLength" type="number" class="form-control full-width" value="15">
            </div>
            <div class="col">             
              <label for="Break Time"> Long Break </label>
              <input id="longBreakLength" type="number" class="form-control full-width" value="5">
            </div>
          </div>
          <div class="extra-padding">
            <button type="submit" v-on:click="updatePomodoroSettings" class="btn btn-primary"> Button </button>
          </div>
        </form> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings-component',
  data() {
    return {
      showWindow: true,
    }
  }, 
  methods: {
    updatePomodoroSettings(event) {
      event.preventDefault();
      let pomodoroLength = parseInt(document.getElementById("pomodoroLength").value);
      let shortBreakLength = parseInt(document.getElementById("shortBreakLength").value);
      let longBreakLength = parseInt(document.getElementById("longBreakLength").value);
      pomodoroTimer.setPomodoroTime(pomodoroLength * 60);
      pomodoroTimer.setShortBreakTime(shortBreakLength * 60);
      pomodoroTimer.setLongBreakTime(longBreakLength * 60);
      this.closeWindow();
    },

    closeWindow() {
      this.showWindow = false;
    }
  }
}
</script>

