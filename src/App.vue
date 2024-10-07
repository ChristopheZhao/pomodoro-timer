<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
/* General Styles */
body, html, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}

.app-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #282c34;
  color: #ffffff;
  font-family: Arial, sans-serif;
  width: 100%;
  min-height: 100vh;
}

.timer-task-wrapper {
  display: flex;
  flex-direction: row;
  gap: 50px;
  align-items: flex-start;
  justify-content: center;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Settings Button */
.settings-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.2s;
}

.settings-button:hover {
  transform: rotate(90deg);
}

/* Settings Menu */
.settings-menu {
  position: absolute;
  top: 60px;
  right: 20px;
  background: #3b3f47;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 200;
}

.settings-menu button {
  display: block;
  background: none;
  border: none;
  color: #ffffff;
  padding: 10px;
  text-align: left;
  width: 100%;
  cursor: pointer;
}

.settings-menu button:hover {
  background: #61666e;
}

/* Past Records Modal */
.past-records-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
}

.modal-content {
  background: #3b3f47;
  padding: 30px;
  border-radius: 10px;
  color: #ffffff;
  text-align: center;
}

.modal-content ul {
  list-style-type: none;
  padding: 0;
  margin: 0 0 20px;
}

.modal-content li {
  margin-bottom: 10px;
}

button {
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}
</style>
