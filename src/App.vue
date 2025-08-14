<template>
  <div id="app">
    <Navbar />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f8f9fa;
}

.container {
  max-width: 900px;
  margin: auto;
  padding: 1rem;
}

button {
  padding: 0.5rem 1rem;
  margin: 0.2rem;
  cursor: pointer;
  background: #007bff;
  border: none;
  color: white;
  border-radius: 4px;
}

button:hover {
  background: #0056b3;
}

input,
select {
  padding: 0.5rem;
  margin: 0.2rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
