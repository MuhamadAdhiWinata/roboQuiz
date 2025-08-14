import { createRouter, createWebHistory } from "vue-router";

import Login from "../pages/Auth/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import ExamLobby from "../pages/Exam/ExamLobby.vue";
import ExamPage from "../pages/Exam/ExamPage.vue";
import ExamResult from "../pages/Exam/ExamResult.vue";

const routes = [
  { path: "/", name: "login", component: Login },
  { path: "/Dashboard", name: "dashboard", component: Dashboard },
  { path: "/ExamLobby", name: "exam-lobby", component: ExamLobby },
  { path: "/exam/:id/start", name: "exam", component: ExamPage },
  { path: "/ExamResult", name: "exam-result", component: ExamResult },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
