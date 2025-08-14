<template>
  <nav class="navbar">
    <div class="navbar-brand" @click="goHome">🦾 RoboQuiz</div>
    <div class="navbar-actions">
      <template v-if="user">
        <span>Hi, {{ user.username }}</span>
        <button @click="logoutUser">Logout</button>
      </template>
      <template v-else>
        <button @click="goLogin">Login</button>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from "../store/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const user = userStore.user;

const goHome = () => {
  router.push("/");
};

const goLogin = () => {
  router.push("/login");
};

const logoutUser = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.navbar {
  background: white;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.navbar-brand {
  font-weight: bold;
  cursor: pointer;
}

.navbar-actions {
  display: flex;
  align-items: center;
}

.navbar-actions button {
  margin-left: 0.5rem;
}
</style>
