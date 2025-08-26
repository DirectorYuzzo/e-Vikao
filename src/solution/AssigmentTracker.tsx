import { useState } from "react";
import {
  Box,
  Text,
  Badge,
  Progress,
  Checkbox,
  Flex,
  VStack,
  HStack,
  Select,
  IconButton,
  useToast,
  Divider,
} from "@chakra-ui/react";
import {
  FiFilter,
  FiCalendar,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  progress: number;
  completed: boolean;
}

interface AssignmentTrackerProps {
  assignments: Assignment[];
}

const priorityColors = {
  high: "red",
  medium: "orange",
  low: "green",
};

const priorityIcons = {
  high: <FiAlertTriangle />,
  medium: <FiCalendar />,
  low: <FiCheckCircle />,
};

export const AssignmentTracker = ({
  assignments: initialAssignments,
}: AssignmentTrackerProps) => {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [assignments, setAssignments] =
    useState<Assignment[]>(initialAssignments);
  const [sortBy, setSortBy] = useState<"dueDate" | "priority">("dueDate");
  const toast = useToast();

  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === "completed") return assignment.completed;
    if (filter === "pending") return !assignment.completed;
    return true;
  });

  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    if (sortBy === "dueDate") return a.dueDate.getTime() - b.dueDate.getTime();
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const handleToggleComplete = (id: string) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, completed: !assignment.completed }
          : assignment
      )
    );

    const assignment = assignments.find((a) => a.id === id);
    if (assignment && !assignment.completed) {
      toast({
        title: "Assignment Completed!",
        description: `${assignment.title} marked as done`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getDueDateText = (dueDate: Date) => {
    const now = new Date();
    const diffDays = Math.ceil(
      (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return "Overdue!";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `Due in ${diffDays} days`;
  };

  return (
    <Box maxW="800px" mx="auto" p={4}>
      {/* Header with controls */}
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">
          My Assignments
        </Text>
        <HStack spacing={4}>
          <Select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "dueDate" | "priority")
            }
            width="150px"
            size="sm"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
          </Select>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            width="150px"
            size="sm"
            icon={<FiFilter />}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </Select>
        </HStack>
      </Flex>

      {/* Assignments list */}
      <VStack spacing={4} align="stretch">
        {sortedAssignments.length === 0 ? (
          <Text textAlign="center" color="gray.500" py={10}>
            No assignments found
          </Text>
        ) : (
          sortedAssignments.map((assignment) => (
            <Box
              key={assignment.id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              bg={assignment.completed ? "gray.50" : "white"}
              opacity={assignment.completed ? 0.8 : 1}
              _hover={{
                shadow: "md",
                transform: "translateY(-2px)",
                transition: "all 0.2s",
              }}
            >
              <Flex justify="space-between" align="flex-start">
                <Box flex={1}>
                  <Flex align="center" mb={1}>
                    <Badge
                      colorScheme={priorityColors[assignment.priority]}
                      mr={2}
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      {priorityIcons[assignment.priority]}
                      {assignment.priority.toUpperCase()}
                    </Badge>
                    <Text fontSize="sm" color="gray.500">
                      {assignment.course}
                    </Text>
                  </Flex>
                  <Text fontWeight="bold" mb={2}>
                    {assignment.title}
                  </Text>

                  <Progress
                    value={assignment.progress}
                    colorScheme={
                      assignment.progress < 30
                        ? "red"
                        : assignment.progress < 70
                        ? "yellow"
                        : "green"
                    }
                    size="sm"
                    mb={2}
                  />
                  <Text fontSize="sm" textAlign="right">
                    {assignment.progress}% complete
                  </Text>
                </Box>

                <VStack align="flex-end" ml={4}>
                  <Text
                    fontWeight="bold"
                    color={
                      assignment.completed
                        ? "green.500"
                        : new Date() > assignment.dueDate
                        ? "red.500"
                        : "gray.700"
                    }
                  >
                    {getDueDateText(assignment.dueDate)}
                  </Text>
                  <Checkbox
                    isChecked={assignment.completed}
                    onChange={() => handleToggleComplete(assignment.id)}
                    colorScheme="green"
                    size="lg"
                  >
                    <Text fontSize="sm">Done</Text>
                  </Checkbox>
                </VStack>
              </Flex>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};
