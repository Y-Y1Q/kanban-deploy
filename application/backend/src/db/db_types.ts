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
  date_scheduled?: string | null;
}

export interface JobData {
  current_status: string;
  company: string;
  position: string;
  salary?: string | null;
  type?: string | null;
  location?: string | null;
  link?: string | null;
  description?: string | null;
  user_note?: string | null;
  date_applied?: string | null;
  date_scheduled?: string | null;
}

export interface Column {
  id: number;
  name: string;
  color: string;
  position: number;
}

export interface ColumnCards {
  id: number;
  user_id: number;
  job_id: number;
  column_id: number;
  position: string;
}

export interface JobStats {
  id: number;
  user_id: number;
  interested?: number;
  pending?: number;
  in_progress?: number;
  offer?: number;
  declined?: number;
  ghosted?: number;
  follow_up?: number;
  applied?: number;
  interview?: number;
  total?: number;
}

export interface DateStats {
  date_applied?: Date | null;
  count?: number | null;
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

export interface AiResume {
  id: number;
  user_id: number;
  fullname: string;
  user_token?: string | null;
  phone_num?: string | null;
  email?: string | null;
  linkedin?: string | null;
  website?: string | null;
  location?: string | null;
  relevant_skills?: string | null;
  education?: string | null;
  experience?: string | null;
  projects?: string | null;
  ai_skills?: string | null;
  ai_edu?: string | null;
  ai_exp?: string | null;
  ai_proj?: string | null;
}

export interface AiInterviewPrep {
  id: number;
  user_id: number;
  company?: string | null;
  job_position?: string | null;
  job_description?: string | null;
  ai_response?: string | null;
}
