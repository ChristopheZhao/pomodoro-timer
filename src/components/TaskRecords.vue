<template>
    <div class="task-records-container">
      <h2>Tasks for {{ formattedDate }}</h2>
      <ul v-if="tasks.length > 0">
        <li v-for="(task, index) in tasks" :key="index">
          {{ index + 1 }}. {{ task.name }} - Completed at: {{ task.completedAt }}
        </li>
      </ul>
      <p v-else>No tasks recorded for this date.</p>
      <button @click="goBack">Back</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  interface Task {
    name: string;
    completedAt: string;
  }
  
  export default defineComponent({
    name: 'TaskRecords',
    props: {
      date: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const route = useRoute();
      const router = useRouter();
      const tasks = computed(() => {
        const taskRecords =
          JSON.parse(localStorage.getItem('taskRecords') || '{}') || {};
        return taskRecords[props.date] || [];
      });
  
      const formattedDate = computed(() => {
        const dateObj = new Date(props.date + 'T00:00:00');
        return dateObj.toDateString();
      });
  
      const goBack = () => {
        router.push('/');
      };
  
      return {
        tasks,
        formattedDate,
        goBack,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Use the enhanced styles provided earlier */
  .task-records-container {
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    padding: 40px;
    border-radius: 10px;
    color: #ffffff;
    text-align: center;
    max-width: 700px;
    margin: 50px auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
  h2 {
    margin-bottom: 30px;
    font-size: 2.5rem;
    font-weight: bold;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 30px;
  }
  li {
    margin-bottom: 15px;
    font-size: 1.2rem;
    text-align: left;
  }
  button {
    background-color: #ff5722;
    color: #ffffff;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
  }
  button:hover {
    background-color: #e64a19;
  }
  </style>
  