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
  useColorModeValue,
} from "@chakra-ui/react";
import { FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import { useState } from "react";
import { useAgendaItems } from "../../hooks/useAgendaItems";
import { AgendaItem } from "../../types";
import AgendaList from "../agendas/AgendaList";
import AgendaModal from "../modals/AgendaModal";

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

  const bg = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("gray.700", "gray.200");

  const {
    items: agendas,
    loading,
    createItem,
    updateItem,
    deleteItem,
    toggleStatus,
    error,
  } = useAgendaItems();

  if (error)
    toast({
      title: "Error loading agendas",
      description: error,
      status: "error",
      duration: 3000,
    });

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
      toast({
        title: "Error creating agenda",
        description: err instanceof Error ? err.message : "Failed",
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
        title: "Agenda updated successfully",
        status: "success",
        duration: 3000,
      });
      setEditingAgenda(null);
      onClose();
    } catch (err) {
      toast({
        title: "Error updating agenda",
        description: err instanceof Error ? err.message : "Failed",
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
          title: "Agenda item deleted",
          status: "success",
          duration: 3000,
        });
      } catch (err) {
        toast({
          title: "Error deleting agenda",
          description: err instanceof Error ? err.message : "Failed",
          status: "error",
          duration: 3000,
        });
      }
    }
  };

  return (
    <Box p={6} bg={bg} minH="100vh">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading color={headingColor}>Agenda Items</Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          onClick={onOpen}
          isLoading={loading}
        >
          New Agenda Item
        </Button>
      </Flex>

      <Flex gap={4} mb={6} direction={{ base: "column", md: "row" }}>
        <InputGroup maxW={{ md: "300px" }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <HStack spacing={3}>
          <Select
            width={{ base: "100%", md: "180px" }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
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
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>
        </HStack>
      </Flex>

      <AgendaList
        title="All Agenda "
        agendas={filteredAgendas}
        loading={loading}
        onEdit={setEditingAgenda}
        onDelete={handleDeleteAgenda}
        onToggleStatus={toggleStatus}
      />

      <AgendaModal
        isOpen={isOpen}
        onClose={() => {
          setEditingAgenda(null);
          onClose();
        }}
        onSave={editingAgenda ? handleEditAgenda : handleCreateAgenda}
        isEditing={!!editingAgenda}
      />
    </Box>
  );
};

export default Agendas;
