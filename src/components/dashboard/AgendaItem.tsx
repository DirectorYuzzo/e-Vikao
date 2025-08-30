import { Box, Text, Flex, Badge, IconButton, HStack } from "@chakra-ui/react";
import { FiMoreVertical, FiCheckCircle } from "react-icons/fi";
import { AgendaItem as AgendaItemType } from "../../types";

interface AgendaItemProps {
  item: AgendaItemType;
  onToggleStatus?: (id: string) => void;
}

const AgendaItem: React.FC<AgendaItemProps> = ({ item, onToggleStatus }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="white" boxShadow="sm">
      <Flex justify="space-between" align="flex-start">
        <Flex align="center" flex="1">
          <IconButton
            aria-label="Toggle status"
            icon={<FiCheckCircle />}
            size="sm"
            variant="ghost"
            color={item.status === "completed" ? "green.500" : "gray.300"}
            _hover={{ color: "green.500", bg: "green.50" }}
            onClick={() => onToggleStatus && onToggleStatus(item.id)}
            mr={3}
          />
          <Box flex="1">
            <Text fontWeight="medium" mb={1}>
              {item.title}
            </Text>
            <Text fontSize="sm" color="gray.600" mb={2}>
              {item.description}
            </Text>
            <HStack spacing={3}>
              <Badge colorScheme={getPriorityColor(item.priority)} size="sm">
                {item.priority} priority
              </Badge>
              <Badge
                colorScheme={item.status === "completed" ? "green" : "gray"}
                size="sm"
              >
                {item.status}
              </Badge>
              <Text fontSize="sm" color="gray.500">
                Due: {item.dueDate}
              </Text>
            </HStack>
          </Box>
        </Flex>
        <IconButton
          aria-label="More options"
          icon={<FiMoreVertical />}
          variant="ghost"
          size="sm"
        />
      </Flex>
    </Box>
  );
};

export default AgendaItem;
