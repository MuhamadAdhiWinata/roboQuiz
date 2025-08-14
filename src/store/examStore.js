import { defineStore } from "pinia";

export const useExamStore = defineStore("exam", {
  state: () => ({
    exam: null,
    questions: [],
    answers: [],
  }),
  actions: {
    setExam(exam) {
      this.exam = exam;
    },
    setQuestions(qs) {
      this.questions = qs;
    },
    saveUserAnswer(qId, option) {
      const idx = this.answers.findIndex((a) => a.question_id === qId);
      if (idx >= 0) {
        this.answers[idx].selected_option = option;
      } else {
        this.answers.push({ question_id: qId, selected_option: option });
      }
    },
  },
});
