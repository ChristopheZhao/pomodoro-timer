<template>
    <div class="timer-container">
      <div class="time">{{ formattedTime }}</div>
      <button @click="startTimer" class="start" :disabled="!currentTask">Start</button>
      <button @click="stopTimer" class="stop">Stop</button>
      <button @click="resetTimer" class="reset">Reset</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['currentTask'],
    data() {
      return {
        minutes: 25,
        seconds: 0,
        isRunning: false,
        countdown: null,
      };
    },
    computed: {
      formattedTime() {
        return `${this.minutes < 10 ? "0" : ""}${this.minutes}:${
          this.seconds < 10 ? "0" : ""
        }${this.seconds}`;
      },
    },
    methods: {
      timer() {
        if (this.seconds === 0 && this.minutes === 0) {
          clearInterval(this.countdown);
          this.$emit('taskCompleted', this.currentTask);
          return;
        }
  
        if (this.seconds === 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.seconds--;
        }
      },
      startTimer() {
        if (!this.isRunning && this.currentTask) {
          this.countdown = setInterval(this.timer, 1000);
          this.isRunning = true;
        } else if (!this.currentTask) {
          alert("Please select a task before starting the timer.");
        }
      },
      stopTimer() {
        clearInterval(this.countdown);
        this.isRunning = false;
      },
      resetTimer() {
        clearInterval(this.countdown);
        this.isRunning = false;
        this.minutes = 25;
        this.seconds = 0;
      },
    },
  };
  </script>
  
  <style scoped>
  .time {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 30px;
    color: #61dafb;
  }
  button {
    font-size: 1.2rem;
    padding: 12px 25px;
    margin: 10px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s;
  }
  button:hover {
    transform: scale(1.05);
  }
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  .start {
    background-color: #4caf50;
    color: white;
  }
  .stop {
    background-color: #f44336;
    color: white;
  }
  .reset {
    background-color: #008cba;
    color: white;
  }
  </style>