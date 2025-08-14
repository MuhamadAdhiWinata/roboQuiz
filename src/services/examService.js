import { supabase } from "./supabase";

// Login sederhana pakai username

export async function login(username) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("username", username) // case-insensitive
    .limit(1);

  if (error) throw error;
  if (!data || data.length === 0) throw new Error("User not found");
  return data[0];
}

// Ambil semua ujian
export async function getExams() {
  const { data, error } = await supabase.from("exams").select("*");
  if (error) throw error;
  return data;
}

// Validasi token
export async function validateExamToken(examId, token) {
  const { data, error } = await supabase
    .from("exam_tokens")
    .select("*")
    .eq("exam_id", examId)
    .eq("token", token)
    .eq("is_active", true)
    .single();
  if (error) throw error;
  return data;
}

// Ambil soal
export async function getQuestions(examId) {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("exam_id", examId);
  if (error) throw error;
  return data;
}

// Simpan jawaban
export async function saveAnswer(answer) {
  const { error } = await supabase.from("answers").insert([answer]);
  if (error) throw error;
}

// Simpan hasil ujian
export async function saveExamResult(result) {
  const { error } = await supabase.from("exam_results").insert([result]);
  if (error) throw error;
}
