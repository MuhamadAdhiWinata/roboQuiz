<template>
  <div>
    <h2>Dashboard</h2>
    <p>Selamat datang di RoboQuiz!</p>
    <router-link to="/exam/123">Mulai Ujian Contoh</router-link>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/userStore";
const userStore = useUserStore();
</script>
