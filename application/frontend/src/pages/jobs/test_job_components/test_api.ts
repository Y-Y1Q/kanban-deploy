import axios from "axios";

export const fetchJobs = async () => {
  const response = await axios.get("/api/jobs");
  return response.data.jobs;
};

export const saveJob = async (jobData: any) => {
  await axios.post("/api/jobs/add", jobData);
};

export const deleteJob = async (jobId: number) => {
  await axios.delete(`/api/jobs/${jobId}`);
};
