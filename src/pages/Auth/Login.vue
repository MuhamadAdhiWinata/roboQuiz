<template>
  <div class="login">
    <h2>Login</h2>
    <input v-model="username" placeholder="Masukkan username" />
    <button @click="handleLogin">Login</button>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { login } from "../../services/examService";
import { useUserStore } from "../../store/userStore";
import { useRouter } from "vue-router";

const username = ref("");
const error = ref("");
const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
  error.value = "";
  try {
    const user = await login(username.value);
    userStore.setUser(user);
    router.push("/ExamLobby"); // redirect ke dashboard
  } catch (err) {
    error.value = err.message;
  }
};
</script>
