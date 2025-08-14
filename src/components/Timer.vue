<template>
  <div class="timer">
    Sisa Waktu: {{ minutes }}:{{ seconds.toString().padStart(2, "0") }}
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  duration: { type: Number, default: 600 }, // detik (default 10 menit)
  onTimeUp: { type: Function, required: true },
});

const timeLeft = ref(props.duration);
const minutes = ref(Math.floor(timeLeft.value / 60));
const seconds = ref(timeLeft.value % 60);
let interval;

onMounted(() => {
  interval = setInterval(() => {
    timeLeft.value--;
    minutes.value = Math.floor(timeLeft.value / 60);
    seconds.value = timeLeft.value % 60;

    if (timeLeft.value <= 0) {
      clearInterval(interval);
      props.onTimeUp();
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>
