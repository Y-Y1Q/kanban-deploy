import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

interface Props {
  setJobsData: React.Dispatch<React.SetStateAction<any[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SearchBar({ setJobsData, setError }: Props) {
  const [searchType, setSearchType] = useState<"company" | "type">("company");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/jobs/${searchType}`, {
        params: { [searchType]: searchValue },
      });
      setJobsData(response.data.jobs);
      setError(null);
    } catch (err) {
      setError("Error fetching jobs data");
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Search By</InputLabel>
        <Select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as "company" | "type")}
          label="Search By"
        >
          <MenuItem value="company">Company</MenuItem>
          <MenuItem value="type">Type</MenuItem>
        </Select>
      </FormControl>

      {searchType === "company" ? (
        <TextField
          label="Company"
          fullWidth
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      ) : (
        <TextField
          label="Job Type"
          fullWidth
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      )}

      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
}
