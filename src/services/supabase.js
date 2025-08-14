import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ioqatkhgzvdbjhekkznf.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvcWF0a2hnenZkYmpoZWtrem5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMzU5MTcsImV4cCI6MjA3MDcxMTkxN30.pCUEj3gAt7yHiylHj6pnT43z27ilxsCtdrZqb4xoFnA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
