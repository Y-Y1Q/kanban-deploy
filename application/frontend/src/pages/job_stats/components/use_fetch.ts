import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchJobStats = async () => {
  const response = await axios.get("/api/jobs/stats");
  return response.data.job_stats[0];
};

const fetchDateStats = async () => {
  const response = await axios.get("/api/jobs/stats-date");
  return response.data.date_stats;
};

export function useFetchJobStats() {
  return useQuery({
    queryKey: ["jobStats"],
    queryFn: fetchJobStats,
  });
}

export function useFetchDateStats() {
  return useQuery({
    queryKey: ["dateStats"],
    queryFn: fetchDateStats,
  });
}
