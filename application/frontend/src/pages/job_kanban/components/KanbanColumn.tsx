import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import { ColumnData } from "../../../types/api_data_types";
import AddJobDialog from "./AddJobDialog";
import JobCard from "./JobCards";

interface KanbanColumnProps {
  column: ColumnData;
  addJobToColumn: (columnId: number, newJob: any) => void;
  onUpdate: (jobId: number, updatedJob: any) => void;
  onDelete: (jobId: number, columnId: number) => void;
}
const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  addJobToColumn,
  onUpdate,
  onDelete,
}) => {
  const headerColor = column.color;
  const cardAreaColor = `${column.color}25`;

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const handleAddDialogOpen = () => setAddDialogOpen(true);
  const handleAddDialogClose = () => setAddDialogOpen(false);

  return (
    <Paper
      style={{
        borderRadius: "8px",
        width: "300px",
        height: "700px", // Fixed height
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Column Header */}
      <Box
        style={{
          backgroundColor: headerColor,
          padding: "8px 16px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" fontWeight="bolder">
          {column.name}
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: headerColor,
          borderTop: 1,
          borderColor: "black",
          padding: "8px 16px",
          color: "#fff",
        }}
      >
        <IconButton
          style={{ margin: "auto", color: "#fff", fontWeight: "bold" }}
          onClick={handleAddDialogOpen}
        >
          <AddBoxTwoToneIcon fontSize="large" /> &nbsp;&nbsp;Add New Job
        </IconButton>

        <AddJobDialog
          isOpen={isAddDialogOpen}
          onClose={handleAddDialogClose}
          columnId={column.id}
          columnName={column.name}
          addJob={addJobToColumn}
        />
      </Box>

      {/* Column Body */}
      <Droppable droppableId={String(column.id)}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              flex: 1,
              padding: "8px",
              backgroundColor: cardAreaColor,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {column.cards.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
};

export default KanbanColumn;
