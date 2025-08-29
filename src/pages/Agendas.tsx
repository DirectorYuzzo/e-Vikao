import React, { useState } from "react";
import AgendaList from "../components/layout/AgendaList";
import { Box } from "@chakra-ui/react";
import { AgendaItem } from "../types";
import { useAgendaItems } from "../hooks/useAgendaItems";

const mockAgendas: AgendaItem[] = [
  {
    id: "1",
    title: "Budget Review",
    description: "kickoff meeting for new client Project",
    status: "pending" as const,
    priority: "high" as const,
    dueDate: "Today",
  },
  {
    id: "2",
    title: "Project kickoff",
    description: "kickoff meeting for new client Project",
    status: "in-progress" as const,
    priority: "medium" as const,
    dueDate: "Tomorrow",
  },
  {
    id: "3",
    title: "Policy update",
    description: "Update company remote work policies",
    status: "pending" as const,
    priority: "low" as const,
    dueDate: "Next week",
  },
];

const Agendas = () => {
  const [showHighPriorityOnly, setShowHighPriorityOnly] = useState(false);

  const filteredAgenda = showHighPriorityOnly
    ? mockAgendas.filter((item) => item.priority === "high")
    : mockAgendas;

  const {
    items: agendas,
    prioritizedItems,
    loading: agendasLoading,
    toggleStatus,
    error: agendasError,
  } = useAgendaItems();

  const handleViewAgenda = () => {
    alert("show agenda...");
  };
  const handleAddAgendaItem = () => {
    alert("Add new Agenda Item...");
  };
  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatus(id);
    } catch (error) {
      // Error is already handled by the hook and shown via toast
    }
  };

  const handleViewDetails = (id: string) => {
    const item = agendas.find((item) => item.id === id);
    alert(`Viewing details for: ${item?.title}`);
  };

  return (
    <Box>
      <AgendaList
        title="Prioritized Agendas"
        items={filteredAgenda}
        isLoading={agendasLoading}
        onAddItem={handleAddAgendaItem}
        onToggleStatus={handleToggleStatus}
        onViewDetails={handleViewDetails}
      />
    </Box>
  );
};

export default Agendas;
