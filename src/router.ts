import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from './components/Home.vue';
import TaskRecords from './components/TaskRecords.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/tasks/:date',
    name: 'TaskRecords',
    component: TaskRecords,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
