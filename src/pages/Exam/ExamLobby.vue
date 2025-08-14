<template>
  <div class="exam-lobby">
    <h2>Pilih Ujian</h2>
    <select v-model="selectedExam">
      <option disabled value="">-- Pilih Ujian --</option>
      <option v-for="exam in exams" :key="exam.id" :value="exam.id">
        {{ exam.name }} - {{ exam.type }}
      </option>
    </select>

    <h3>Masukkan Token Ujian</h3>
    <input v-model.trim="token" placeholder="Token ujian" />
    <button @click="startExam">Mulai</button>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getExams,
  validateExamToken,
  getQuestions,
} from "../../services/examService";
import { useExamStore } from "../../store/examStore";
import { useRouter } from "vue-router";

const exams = ref([]);
const selectedExam = ref("");
const token = ref("");
const error = ref("");
const router = useRouter();
const examStore = useExamStore();

onMounted(async () => {
  try {
    exams.value = await getExams();
  } catch (err) {
    error.value = "Gagal memuat daftar ujian.";
  }
});

const startExam = async () => {
  error.value = "";

  if (!selectedExam.value) {
    error.value = "Pilih ujian terlebih dahulu.";
    return;
  }

  if (!token.value || token.value.trim().length === 0) {
    error.value = "Token ujian harus diisi.";
    return;
  }

  try {
    await validateExamToken(selectedExam.value, token.value);

    // Simpan exam dan soal ke store
    const selectedExamData = exams.value.find(
      (e) => e.id === selectedExam.value
    );
    examStore.setExam(selectedExamData);

    const qs = await getQuestions(selectedExam.value);
    examStore.setQuestions(qs);

    router.push(`/exam/${selectedExam.value}/start`);
  } catch (err) {
    error.value = "Token ujian tidak valid.";
  }
};
</script>
