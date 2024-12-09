import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import columnData from "../../../constants/kanban_columns";
import { ColumnData } from "../../../types/api_data_types";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<ColumnData[]>([]);

  // Load columns and cards data
  useEffect(() => {
    const fetchColumns = async () => {
      const fetchCardsForColumn = async (columnId: number) => {
        const response = await axios.get(`/api/col/${columnId}/cards`);
        return response.data.jobs;
      };

      const enrichedColumns = await Promise.all(
        columnData.map(async (col) => ({
          ...col,
          cards: await fetchCardsForColumn(col.id),
        }))
      );

      setColumns(enrichedColumns);
    };

    fetchColumns();
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Reorganize the cards in columns
    const updatedColumns = [...columns];
    const sourceColumnIndex = updatedColumns.findIndex(
      (col) => col.id === parseInt(source.droppableId)
    );
    const destColumnIndex = updatedColumns.findIndex(
      (col) => col.id === parseInt(destination.droppableId)
    );

    const [movedCard] = updatedColumns[sourceColumnIndex].cards.splice(source.index, 1);
    updatedColumns[destColumnIndex].cards.splice(destination.index, 0, movedCard);

    setColumns(updatedColumns);
  };

  const refetchColumnCards = async (columnId: number) => {
    try {
      const response = await axios.get(`/api/col/${columnId}/cards`);
      const updatedCards = response.data.jobs;

      setColumns((prevColumns) =>
        prevColumns.map((col) => (col.id === columnId ? { ...col, cards: updatedCards } : col))
      );
    } catch (error) {
      console.error("Error fetching column cards:", error);
    }
  };

  const addJobToColumn = async (columnId: number, newJob: any) => {
    try {
      await axios.post("/api/jobs/add", {
        column_id: newJob.column_id,
        jobData: newJob,
      });
      await refetchColumnCards(columnId); // Refetch column cards after adding the job
    } catch (error) {
      console.error("Error adding job to column:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "16px", overflowX: "auto" }}>
        {columns.map((col) => (
          <KanbanColumn key={col.id} column={col} addJobToColumn={addJobToColumn} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
