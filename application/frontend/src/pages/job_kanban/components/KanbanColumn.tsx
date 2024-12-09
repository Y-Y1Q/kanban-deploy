import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { Droppable } from "react-beautiful-dnd";

import { ColumnData } from "../../../types/api_data_types";
import JobCard from "./JobCards";

interface KanbanColumnProps {
  column: ColumnData;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column }) => {
  const headerColor = column.color;
  const cardAreaColor = `${column.color}25`;

  return (
    <Paper
      style={{
        borderRadius: "8px",
        width: "300px",
        height: "600px", // Fixed height
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
        <Typography variant="h2" fontWeight="bold">
          {column.name}
        </Typography>
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
              <JobCard key={job.id} job={job} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
};

export default KanbanColumn;
