import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import columnData from "../../../constants/kanban_columns";
import { ColumnData } from "../../../types/api_data_types";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<ColumnData[]>([]);

  // Load columns and cards data
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

  useEffect(() => {
    fetchColumns();
  }, [columnData]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Check if the card was moved within the same column
    if (source.droppableId === destination.droppableId) {
      const updatedColumns = [...columns];
      const columnIndex = updatedColumns.findIndex(
        (col) => col.id === parseInt(source.droppableId)
      );

      // Reorder the cards within the same column
      const [movedCard] = updatedColumns[columnIndex].cards.splice(source.index, 1);
      updatedColumns[columnIndex].cards.splice(destination.index, 0, movedCard);

      // Optimistically update the UI
      setColumns(updatedColumns);

      // Update backend with the new position
      try {
        await axios.post(`/api/card-pos/${movedCard.id}`, {
          card_pos: destination.index,
        });
      } catch (error) {
        console.error("Failed to update card position:", error);
        // Optionally revert the UI changes on error
        setColumns(columns);
      }
    } else {
      // Handle card moving between columns
      const updatedColumns = [...columns];
      const sourceColumnIndex = updatedColumns.findIndex(
        (col) => col.id === parseInt(source.droppableId)
      );
      const destColumnIndex = updatedColumns.findIndex(
        (col) => col.id === parseInt(destination.droppableId)
      );

      const [movedCard] = updatedColumns[sourceColumnIndex].cards.splice(source.index, 1);
      updatedColumns[destColumnIndex].cards.splice(destination.index, 0, movedCard);

      // Optimistically update the UI
      setColumns(updatedColumns);

      // Update backend with the new column_id and current_status
      try {
        await axios.post(`/api/card/${movedCard.id}`, {
          jobData: {
            column_id: updatedColumns[destColumnIndex].id,
            current_status: updatedColumns[destColumnIndex].name,
            card_pos: destination.index,
          },
        });
      } catch (error) {
        console.error("Failed to update job card:", error);
        // Optionally revert the UI changes on error
        setColumns((prevColumns) => {
          const revertedColumns = [...prevColumns];
          revertedColumns[sourceColumnIndex].cards.splice(source.index, 0, movedCard);
          revertedColumns[destColumnIndex].cards.splice(destination.index, 1);
          return revertedColumns;
        });
      }
    }
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

  const handleCardUpdate = async (jobId: number, updatedJob: any) => {
    await axios.post(`/api/jobs/update/${jobId}`, {
      jobData: updatedJob,
    });
    await fetchColumns();
  };

  const handleCardDelete = async (jobId: number, columnId: number) => {
    await axios.delete(`/api/jobs/${jobId}`);
    await refetchColumnCards(columnId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "16px", overflowX: "auto" }}>
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            addJobToColumn={addJobToColumn}
            onUpdate={handleCardUpdate}
            onDelete={handleCardDelete}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
