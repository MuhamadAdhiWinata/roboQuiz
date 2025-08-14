<template>
  <div class="exam-result">
    <h2>Hasil Ujian</h2>
    <p>Nama Ujian: {{ exam?.name }}</p>
    <p>Skor: {{ score }}</p>
    <button @click="backToDashboard">Kembali ke Dashboard</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useExamStore } from "../../store/examStore";
import { useRouter } from "vue-router";
import { supabase } from "../../services/supabase";
import { useUserStore } from "../../store/userStore";

const examStore = useExamStore();
const userStore = useUserStore();
const router = useRouter();
const score = ref(0);
const exam = examStore.exam;

onMounted(async () => {
  // Hitung skor dari jawaban
  const { data: answers } = await supabase
    .from("answers")
    .select(
      `
      question_id,
      selected_option,
      questions(correct_option)
    `
    )
    .eq("exam_id", exam.id)
    .eq("user_id", userStore.user.id);

  let total = 0;
  answers.forEach((a) => {
    if (a.selected_option === a.questions.correct_option) {
      total++;
    }
  });
  score.value = `${total} / ${answers.length}`;
});

const backToDashboard = () => {
  router.push("/");
};
</script>
