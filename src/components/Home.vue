<template>
    <div class="home-container">
      <!-- Settings Button in the Upper Right Corner -->
      <button class="settings-button" @click="toggleSettingsMenu">&#9881;</button>
  
      <!-- Settings Menu -->
      <Settings
        :showSettingsMenu="showSettingsMenu"
        @closeSettingsMenu="closeSettingsMenu"
        @deleteAllTasks="deleteAllTasks"
        @reorderTasks="reorderTasks"
      />
  
      <!-- Main Content -->
      <div class="timer-task-wrapper">
        <Timer :currentTask="currentTask" @taskCompleted="handleTaskCompleted" />
        <TaskList
          :tasks="tasks"
          @startTask="startTask"
          @deleteTask="deleteTask"
          @addTask="addTask"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Timer from './Timer.vue';
  import TaskList from './TaskList.vue';
  import Settings from './Settings.vue';
  
  interface Task {
    name: string;
    status: string;
    statusColor: string;
  }
  
  export default defineComponent({
    name: 'Home',
    components: {
      Timer,
      TaskList,
      Settings,
    },
    data() {
      return {
        tasks: [] as Task[],
        currentTask: null as string | null,
        showSettingsMenu: false,
      };
    },
    methods: {
      toggleSettingsMenu() {
        this.showSettingsMenu = !this.showSettingsMenu;
      },
      closeSettingsMenu() {
        this.showSettingsMenu = false;
      },
      deleteAllTasks() {
        this.tasks = [];
        localStorage.removeItem('taskRecords');
        alert('All tasks have been deleted.');
        this.showSettingsMenu = false;
      },
      reorderTasks() {
        alert('Reordering tasks feature is under development.');
        this.showSettingsMenu = false;
      },
      startTask(task: Task) {
        if (this.currentTask) {
          alert('Please complete the current task before starting a new one.');
          return;
        }
        this.currentTask = task.name;
        task.status = 'In Progress';
        this.saveTasksToLocalStorage();
      },
      addTask(newTask: Task) {
        newTask.status = 'Not Completed';
        this.tasks.push(newTask);
        this.saveTasksToLocalStorage();
        },
      deleteTask(index: number) {
        this.tasks.splice(index, 1);
        this.saveTasksToLocalStorage();
      },
      handleTaskCompleted(taskName: string) {
        // 更新任务状态
        this.tasks = this.tasks.map((t) =>
          t.name === taskName
            ? { ...t, status: 'Completed', statusColor: '#2196f3' }
            : t
        );
        // 清除当前任务
        this.currentTask = null;
        // 保存更新后的任务到 localStorage
        this.saveTasksToLocalStorage();
      },
      saveTasksToLocalStorage() {
        const taskRecords =
          JSON.parse(localStorage.getItem('taskRecords') || '{}') || {};
        const dateKey = new Date().toISOString().split('T')[0];
        taskRecords[dateKey] = this.tasks;
        localStorage.setItem('taskRecords', JSON.stringify(taskRecords));
      },
      loadTasksFromLocalStorage() {
        const taskRecords =
          JSON.parse(localStorage.getItem('taskRecords') || '{}') || {};
        const dateKey = new Date().toISOString().split('T')[0];
        this.tasks = taskRecords[dateKey] || [];
      },
    },
    mounted() {
      this.loadTasksFromLocalStorage();
    },
  });
  </script>
  
  <style scoped>
  .home-container {
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
  
  /* Settings Button Styles */
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
  </style>
  