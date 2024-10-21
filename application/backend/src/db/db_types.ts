export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface Job {
  id: number;
  user_id: number;
  column_id: number;
  current_status: string;
  company: string;
  position: string;
  salary?: string | null;
  type?: string | null;
  location?: string | null;
  link?: string | null;
  description?: string | null;
  user_note?: string | null;
  date_applied?: Date | null;
  date_scheduled?: string| null;
}

export interface Column {
  id: number;
  name: string;
  color: string;
  position: number;
}

export interface Doc {
  id: number;
  user_id: number;
  title?: string | null;
  filepath: string;
}

export interface Contact {
  id: number;
  user_id: number;
  user_note?: string | null;
  name?: string | null;
  position?: string | null;
  company?: string | null;
  email?: string | null;
  phone_num?: string | null;
}

export interface AIResumeBuilder {
  id: number;
  user_id: number;
  doc_id?: number | null;
  personal_information?: string | null;
  relevant_skills?: string | null;
  education?: string | null;
  experience?: string | null;
  projects?: string | null;
}

export interface AIInterviewPrep {
  id: number;
  user_id: number;
  company?: string | null;
  job_position?: string | null;
  job_description?: string | null;
  ai_response?: string | null;
}
