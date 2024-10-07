<template>
  <div>
    <!-- Settings Menu -->
    <div v-if="showSettingsMenu" class="settings-menu">
      <button @click="openPastRecords">View Past Records</button>
      <button @click="deleteAllTasks">Delete All Tasks</button>
    </div>

    <!-- Past Records Modal -->
    <div v-if="showPastRecordsModal" class="past-records-modal">
      <div class="modal-content">
        <h3>Select a Date</h3>
        <div ref="calendarRef"></div>
        <button @click="closePastRecordsModal">Close</button>
      </div>
    </div>

    <!-- Task Records Modal -->
    <div v-if="showTaskRecordsModal" class="task-records-modal">
      <div class="modal-content">
        <h3>Tasks for {{ formattedDate }}</h3>
        <ul v-if="tasksForSelectedDate.length > 0">
          <li v-for="(task, index) in tasksForSelectedDate" :key="index">
            {{ index + 1 }}. {{ task.name }} - Status: {{ taskStatusText(task) }}
          </li>
        </ul>
        <p v-else>No tasks recorded for this date.</p>
        <button @click="closeTaskRecordsModal">Back</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, toRefs, watch, computed } from 'vue';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default defineComponent({
  name: 'Settings',
  props: {
    showSettingsMenu: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['closeSettingsMenu', 'deleteAllTasks', 'reorderTasks'],
  setup(props, { emit }) {
    const { showSettingsMenu } = toRefs(props);
    const showPastRecordsModal = ref(false);
    const showTaskRecordsModal = ref(false);
    const selectedDate = ref('');
    const tasksForSelectedDate = ref<any[]>([]);
    const formattedDate = computed(() => {
      if (selectedDate.value) {
        const dateObj = new Date(selectedDate.value + 'T00:00:00');
        return dateObj.toDateString();
      }
      return '';
    });
    const taskRecords = ref<Record<string, any[]>>({});
    const calendarRef = ref<HTMLDivElement | null>(null);
    let flatpickrInstance: flatpickr.Instance | null = null;

    const openPastRecords = () => {
      showPastRecordsModal.value = true;
      emit('closeSettingsMenu');
      refreshTaskRecords();
    };

    const closePastRecordsModal = () => {
      showPastRecordsModal.value = false;
      if (flatpickrInstance) {
        flatpickrInstance.destroy();
        flatpickrInstance = null;
      }
    };

    const closeTaskRecordsModal = () => {
      showTaskRecordsModal.value = false;
      // Return to date picker modal; no action needed since it's still open
    };

    const refreshTaskRecords = () => {
      taskRecords.value =
        JSON.parse(localStorage.getItem('taskRecords') || '{}') || {};
    };

    const initializeCalendar = () => {
      if (calendarRef.value) {
        if (flatpickrInstance) {
          flatpickrInstance.destroy();
        }
        const enabledDates = Object.keys(taskRecords.value).map((dateStr) => {
          return dateStr;
        });

        flatpickrInstance = flatpickr(calendarRef.value, {
          inline: true,
          dateFormat: 'Y-m-d',
          enable: enabledDates,
          onDayCreate: (dObj, dStr, fp, dayElem) => {
            const date = dayElem.dateObj;
            const dateStr = fp.formatDate(date, 'Y-m-d');
            if (taskRecords.value[dateStr]) {
              dayElem.innerHTML += '<span class="task-dot"></span>';
              dayElem.classList.add('has-task');
            }
          },
          onChange: (selectedDates, dateStr) => {
            selectedDate.value = dateStr;
            tasksForSelectedDate.value = taskRecords.value[dateStr] || [];
            showTaskRecordsModal.value = true;
          },
        });
      } else {
        console.error('calendarRef.value is null');
      }
    };

    const taskStatusText = (task: any) => {
      if (task.status === 'Completed') {
        return 'Completed';
      } else if (task.status === 'In Progress') {
        return 'In Progress';
      } else {
        return 'Not Completed';
      }
    };
    // Watch for changes in showPastRecordsModal
    watch(showPastRecordsModal, (newVal) => {
      if (newVal) {
        // Modal is now open
        nextTick(() => {
          initializeCalendar();
        });
      } else {
        // Modal is closed, destroy the Flatpickr instance
        if (flatpickrInstance) {
          flatpickrInstance.destroy();
          flatpickrInstance = null;
        }
      }
    });

    const deleteAllTasks = () => {
      emit('deleteAllTasks');
      emit('closeSettingsMenu');
    };

    const reorderTasks = () => {
      emit('reorderTasks');
      emit('closeSettingsMenu');
    };

    return {
      showSettingsMenu,
      showPastRecordsModal,
      showTaskRecordsModal,
      selectedDate,
      formattedDate,
      tasksForSelectedDate,
      openPastRecords,
      closePastRecordsModal,
      closeTaskRecordsModal,
      calendarRef,
      deleteAllTasks,
      reorderTasks,
      taskStatusText,
    };
  },
});
</script>


<style scoped>
/* Include your existing styles and the task-dot styles */
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

.modal-content button {
  margin-top: 20px;
}

/* Styles for the dot indicator */
.task-dot {
  display: block;
  width: 5px;
  height: 5px;
  background: #ff5722;
  border-radius: 50%;
  margin: 2px auto 0;
}

.flatpickr-day.has-task {
  position: relative;
}

.task-records-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 400; /* Ensure it's above the date picker modal */
}

.task-records-modal .modal-content {
  background: #3b3f47;
  padding: 30px;
  border-radius: 10px;
  color: #ffffff;
  text-align: center;
  max-width: 600px;
  width: 90%;
}

.task-records-modal button {
  margin-top: 20px;
}

</style>
