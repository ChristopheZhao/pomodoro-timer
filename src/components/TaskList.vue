<template>
  <div class="task-list">
    <h3>Task List</h3>
    <input type="text" v-model="newTask" placeholder="Enter your task or goal here..." class="task-input" />
    <button @click="addTask" class="add-task">Add Task</button>
    <!-- Task Cards -->
    <div v-for="(task, index) in tasks" :key="index" class="task-card">
      <div class="task-item">{{ task.name }}</div>
      <div class="task-status" :style="{ color: task.statusColor }">{{ task.status }}</div>
      <div class="task-actions">
        <button class="start" @click="$emit('startTask', task)" :disabled="task.status === 'In Progress'">Start Task</button>
        <button class="delete" @click="deleteTask(index)">Delete Task</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tasks"],
  data() {
    return {
      newTask: "",
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        const newTask = {
          name: this.newTask,
          status: "Not Started",
          statusColor: "#ffa726",
        };
        this.$emit("addTask", newTask);
        this.newTask = "";
      }
    },
    deleteTask(index) {
      this.$emit("deleteTask", index);
    },
  },
};
</script>

<style scoped>
.task-list {
  background: #4a4f58;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  color: #ffffff;
  text-align: left;
  position: relative;
}
.task-list h3 {
  text-align: center;
  margin-bottom: 10px;
}
.task-input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
}
.add-task {
  font-size: 1rem;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.add-task:hover {
  background-color: #45a049;
}
.task-card {
  background: #3b3f47;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}
.task-item {
  font-size: 1rem;
  margin-bottom: 5px;
}
.task-status {
  font-size: 0.9rem;
  font-style: italic;
  color: #ffa726;
}
.task-actions {
  text-align: right;
}
.task-actions .start {
  background: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.task-actions .start:hover {
  background: #45a049;
}
.task-actions .delete {
  background: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.task-actions .delete:hover {
  background: #d32f2f;
}
</style>
