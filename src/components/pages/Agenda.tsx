import {
  Box,
  Heading,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useToast,
  useDisclosure,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import { useState } from "react";
import { useAgendaItems } from "../../hooks/useAgendaItems";
import { AgendaItem } from "../../types";
import AgendaList from "../agendas/AgendaList";
import AgendaModal from "../modals/AgendaModal";
// import AgendaList from "../components/agendas/AgendaList";
// import AgendaModal from "../components/modals/AgendaModal";
// import { useAgendaItems } from "../hooks/useAgendaItems";
// import { AgendaItem } from "../types";

const Agendas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "in-progress" | "completed"
  >("all");
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "high" | "medium" | "low"
  >("all");
  const [editingAgenda, setEditingAgenda] = useState<AgendaItem | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    items: agendas,
    loading,
    createItem,
    updateItem,
    deleteItem,
    toggleStatus,
    error,
  } = useAgendaItems();

  // Show errors if any occur
  if (error) {
    toast({
      title: "Error loading agendas",
      description: error,
      status: "error",
      duration: 3000,
    });
  }

  // Filter agendas based on search, status, and priority
  const filteredAgendas = agendas.filter((agenda) => {
    const matchesSearch =
      agenda.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agenda.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : agenda.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" ? true : agenda.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Calculate statistics
  const totalAgendas = agendas.length;
  const completedAgendas = agendas.filter(
    (a) => a.status === "completed"
  ).length;
  const highPriorityAgendas = agendas.filter(
    (a) => a.priority === "high"
  ).length;

  const handleCreateAgenda = async (itemData: Omit<AgendaItem, "id">) => {
    try {
      await createItem(itemData);
      toast({
        title: "Agenda item created successfully",
        status: "success",
        duration: 3000,
      });
      onClose();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create agenda item";
      toast({
        title: "Error creating agenda item",
        description: errorMessage,
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleEditAgenda = async (itemData: Omit<AgendaItem, "id">) => {
    if (!editingAgenda) return;

    try {
      await updateItem(editingAgenda.id, itemData);
      toast({
        title: "Agenda item updated successfully",
        status: "success",
        duration: 3000,
      });
      setEditingAgenda(null);
      onClose();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update agenda item";
      toast({
        title: "Error updating agenda item",
        description: errorMessage,
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleDeleteAgenda = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this agenda item?")) {
      try {
        await deleteItem(id);
        toast({
          title: "Agenda item deleted successfully",
          status: "success",
          duration: 3000,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete agenda item";
        toast({
          title: "Error deleting agenda item",
          description: errorMessage,
          status: "error",
          duration: 3000,
        });
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatus(id);
      toast({
        title: "Status updated successfully",
        status: "success",
        duration: 2000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update status";
      toast({
        title: "Error updating status",
        description: errorMessage,
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleEditClick = (agenda: AgendaItem) => {
    setEditingAgenda(agenda);
    onOpen();
  };

  const handleModalClose = () => {
    setEditingAgenda(null);
    onClose();
  };

  return (
    <Box p={6}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="xl" color="gray.700">
          Agenda Items
        </Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          onClick={onOpen}
          isLoading={loading}
        >
          New Agenda Item
        </Button>
      </Flex>

      {/* Stats Summary */}
      <HStack spacing={6} mb={6} justify="space-around">
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">
            {totalAgendas}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Total Items
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color="green.600">
            {completedAgendas}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Completed
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color="red.600">
            {highPriorityAgendas}
          </Text>
          <Text fontSize="sm" color="gray.600">
            High Priority
          </Text>
        </Box>
      </HStack>

      {/* Search and Filter Section */}
      <Flex gap={4} mb={6} direction={{ base: "column", md: "row" }}>
        <InputGroup maxW={{ md: "300px" }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search agenda items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <HStack spacing={3}>
          <Select
            width={{ base: "100%", md: "180px" }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            icon={<FiFilter />}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>

          <Select
            width={{ base: "100%", md: "180px" }}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            icon={<FiFilter />}
          >
            <option value="all">All Priority</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </Select>
        </HStack>
      </Flex>

      {/* Agenda List */}
      <AgendaList
        agendas={filteredAgendas}
        loading={loading}
        onEdit={handleEditClick}
        onDelete={handleDeleteAgenda}
        onToggleStatus={handleToggleStatus}
        title={""}
      />

      {/* Agenda Creation/Edit Modal */}
      <AgendaModal
        isOpen={isOpen}
        onClose={handleModalClose}
        onSave={editingAgenda ? handleEditAgenda : handleCreateAgenda}
        // initialData={editingAgenda}
        isEditing={!!editingAgenda}
      />
    </Box>
  );
};

export default Agendas;
