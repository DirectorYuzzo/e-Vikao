import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AgendaItem } from "../../types";

interface AgendaFormProps {
  onSubmit: (item: Omit<AgendaItem, "id">) => void;
  onCancel: () => void;
  initialData?: AgendaItem;
}

const AgendaForm: React.FC<AgendaFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed">(
    "pending"
  );
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [dueDate, setDueDate] = useState("");
  const toast = useToast();

  // Pre-fill form if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
      setPriority(initialData.priority);
      setDueDate(initialData.dueDate);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: "Please enter a title",
        status: "error",
        duration: 3000,
      });
      return;
    }

    onSubmit({
      title,
      description,
      status,
      priority,
      dueDate,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter agenda item title"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter agenda item description"
            rows={3}
          />
        </FormControl>

        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Priority</FormLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Due Date</FormLabel>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </FormControl>

        <HStack spacing={4} justify="flex-end" mt={6}>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" colorScheme="blue">
            {initialData ? "Update Item" : "Create Item"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default AgendaForm;
