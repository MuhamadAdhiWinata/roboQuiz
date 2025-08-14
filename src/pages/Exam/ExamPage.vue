<template>
  <div v-if="exam">
    <h2>{{ exam.name }}</h2>
    <Timer :duration="300" :onTimeUp="submitExam" />

    <div v-if="questions.length > 0">
      <div v-for="(q, i) in questions" :key="q.id" class="question-block">
        <p>{{ i + 1 }}. {{ q.question_text }}</p>
        <div class="options">
          <div
            v-for="opt in ['A', 'B', 'C', 'D']"
            :key="opt"
            class="option"
            @click="answer(q.id, opt)">
            <span class="label">{{ opt }}</span>
            <span class="text">{{ q["option_" + opt.toLowerCase()] }}</span>
          </div>
        </div>
      </div>
      <button @click="submitExam">Submit</button>
    </div>

    <p v-else>Memuat soal...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useExamStore } from "../../store/examStore";
import { useUserStore } from "../../store/userStore";
import {
  getQuestions,
  saveAnswer,
  saveExamResult,
} from "../../services/examService";
import { useRouter } from "vue-router";
import Timer from "../../components/Timer.vue";

const examStore = useExamStore();
const userStore = useUserStore();
const router = useRouter();

const exam = ref(examStore.exam);
const questions = ref([]);

onMounted(async () => {
  if (!exam.value || !exam.value.id) {
    console.error("Exam ID tidak ada di store");
    return;
  }

  try {
    questions.value = await getQuestions(exam.value.id);
  } catch (err) {
    console.error("Gagal load soal:", err.message);
  }
});

const answer = (qId, option) => {
  examStore.saveUserAnswer(qId, option);
};

const submitExam = async () => {
  const userId = userStore.user.id;
  const examId = exam.value.id;

  for (const ans of examStore.answers) {
    await saveAnswer({
      user_id: userId,
      exam_id: examId,
      question_id: ans.question_id,
      selected_option: ans.selected_option,
    });
  }

  await saveExamResult({
    user_id: userId,
    exam_id: examId,
    score: 0,
  });

  router.push(`/exam/${examId}/result`);
};
</script>

<style>
.option {
  display: flex;
  align-items: center;
  margin: 4px 0;
  cursor: pointer;
}

.option .label {
  background-color: #007bff; /* biru */
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  font-weight: bold;
}

.option .text {
  color: black;
}
</style>
