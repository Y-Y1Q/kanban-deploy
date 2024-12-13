import { LoadingButton } from "@mui/lab";
import { Box, Button, CircularProgress, Divider, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface ResumeData {
  fullname: string;
  phone_num: string;
  email: string;
  linkedin: string;
  website: string;
  location: string;
  relevant_skills: string;
  education: string;
  experience: string;
  projects: string;
  user_token?: string;
}

export default function AiResumeInput() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullname: "",
    phone_num: "",
    email: "",
    linkedin: "",
    website: "",
    location: "",
    relevant_skills: "",
    education: "",
    experience: "",
    projects: "",
  });
  const [resumeToken, setResumeToken] = useState<string | null>(null);
  const [hasInput, setHasInput] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingBuild, setLoadingBuild] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(true); // New loading state for fetchData

  useEffect(() => {
    async function fetchData() {
      setLoadingFetch(true); // Start loading
      try {
        const response = await axios.get<{ hasInput: boolean; resumeData: ResumeData }>(
          "/api/ai-resume"
        );
        const data = response.data;
        setHasInput(data.hasInput);
        if (data.hasInput) {
          setResumeData(data.resumeData);
          setResumeToken(data.resumeData.user_token || null);
        }
      } catch (error) {
        toast.error("Error fetching resume data", { position: "bottom-center" });
      } finally {
        setLoadingFetch(false); // Stop loading
      }
    }
    fetchData();
  }, []);

  const handleInputChange =
    (field: keyof ResumeData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setResumeData((prev) => ({ ...prev, [field]: e.target.value.trim() }));
    };

  const handleSave = async () => {
    setLoadingSave(true);
    try {
      const response = await axios.post("/api/ai-resume/save", { resumeData });
      toast.success(response.data.message, { position: "bottom-center" });
      setHasInput(true);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to save", { position: "bottom-center" });
    } finally {
      setLoadingSave(false);
    }
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const response = await axios.delete("/api/ai-resume");
      toast.success(response.data.message, { position: "bottom-center" });
      setHasInput(false);
      setResumeData({
        fullname: "",
        phone_num: "",
        email: "",
        linkedin: "",
        website: "",
        location: "",
        relevant_skills: "",
        education: "",
        experience: "",
        projects: "",
      });
      setResumeToken(null);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to delete", { position: "bottom-center" });
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleBuild = async () => {
    setLoadingBuild(true);
    try {
      const response = await axios.post("/api/ai-resume/build");
      toast.success(response.data.message, { position: "bottom-center" });
      setResumeToken(response.data.token);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to build resume", {
        position: "bottom-center",
      });
    } finally {
      setLoadingBuild(false);
    }
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", pr: 1, pl: 1, pb: 2, boxShadow: 2, borderRadius: 1 }}>
      {loadingFetch ? ( // Display CircularProgress while loading
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 3 }}>
            {/* Group 1 */}
            <Box sx={{ flex: 1, minWidth: 250, display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Full Name"
                value={resumeData.fullname}
                onChange={handleInputChange("fullname")}
                variant="outlined"
                margin="dense"
                required
                fullWidth
              />

              <TextField
                label="Phone Number"
                value={resumeData.phone_num}
                onChange={handleInputChange("phone_num")}
                variant="outlined"
                margin="dense"
                required
                fullWidth
              />

              <TextField
                label="Relevant Skills"
                value={resumeData.relevant_skills}
                onChange={handleInputChange("relevant_skills")}
                variant="outlined"
                margin="dense"
                fullWidth
                multiline
                maxRows={5}
              />
              <TextField
                label="Education"
                value={resumeData.education}
                onChange={handleInputChange("education")}
                variant="outlined"
                margin="dense"
                fullWidth
                multiline
                maxRows={5}
              />
            </Box>

            {/* Group 2 */}
            <Box sx={{ flex: 1, minWidth: 250, display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Location"
                value={resumeData.location}
                onChange={handleInputChange("location")}
                variant="outlined"
                margin="dense"
                required
                fullWidth
              />

              <TextField
                label="Email"
                value={resumeData.email}
                onChange={handleInputChange("email")}
                variant="outlined"
                margin="dense"
                required
                fullWidth
              />

              <TextField
                label="Experience"
                value={resumeData.experience}
                onChange={handleInputChange("experience")}
                variant="outlined"
                margin="dense"
                fullWidth
                multiline
                maxRows={25}
              />
            </Box>

            {/* Group 3 */}

            <Box sx={{ flex: 1, minWidth: 250, display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Linkedin"
                value={resumeData.linkedin}
                onChange={handleInputChange("linkedin")}
                variant="outlined"
                margin="dense"
                required
                fullWidth
              />

              <TextField
                label="Website"
                value={resumeData.website}
                onChange={handleInputChange("website")}
                variant="outlined"
                margin="dense"
                required
                fullWidth
              />

              <TextField
                label="Projects"
                value={resumeData.projects}
                onChange={handleInputChange("projects")}
                variant="outlined"
                margin="dense"
                fullWidth
                multiline
                maxRows={25}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Button Box */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <LoadingButton
              onClick={handleSave}
              loading={loadingSave}
              variant="contained"
              sx={{ backgroundColor: "#4CAF50", "&:hover": { backgroundColor: "#388E3C" } }}
            >
              Save
            </LoadingButton>
            {hasInput && (
              <>
                <LoadingButton
                  onClick={handleDelete}
                  loading={loadingDelete}
                  variant="contained"
                  sx={{ backgroundColor: "#F44336", "&:hover": { backgroundColor: "#D32F2F" } }}
                >
                  Delete
                </LoadingButton>
                <LoadingButton
                  onClick={handleBuild}
                  loading={loadingBuild}
                  variant="contained"
                  sx={{ backgroundColor: "#2196F3", "&:hover": { backgroundColor: "#1976D2" } }}
                >
                  Build
                </LoadingButton>
              </>
            )}
            {hasInput && resumeToken && (
              <Button
                onClick={() => window.open(`${BASE_URL}/ai-resume/${resumeToken}`, "_blank")}
                variant="contained"
                sx={{
                  backgroundColor: "#607D8B",
                  "&:hover": { backgroundColor: "#455A64" },
                }}
              >
                View Resume
              </Button>
            )}
          </Box>
        </>
      )}

      <ToastContainer position="bottom-center" />
    </Box>
  );
}
