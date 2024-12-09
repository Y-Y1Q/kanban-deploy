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
        const response = await fetch(`/api/col/${columnId}/cards`);
        const data = await response.json();
        return data.jobs;
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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "16px", overflowX: "auto" }}>
        {columns.map((col) => (
          <KanbanColumn key={col.id} column={col} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
