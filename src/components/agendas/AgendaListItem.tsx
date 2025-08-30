import {
  Box,
  Flex,
  Text,
  Badge,
  IconButton,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { AgendaItem } from "../../types";

interface AgendaListItemProps {
  item: AgendaItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}

const AgendaListItem: React.FC<AgendaListItemProps> = ({
  item,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

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
    <Box
      p={4}
      borderWidth="1px"
      borderColor={borderColor}
      _hover={{ bg: hoverBg }}
      transition="background-color 0.2s"
    >
      <Flex justify="space-between" align="flex-start">
        <Flex align="center" flex="1">
          <IconButton
            aria-label="Toggle status"
            icon={<FiCheckCircle />}
            size="sm"
            variant="ghost"
            color={item.status === "completed" ? "green.500" : "gray.300"}
            _hover={{ color: "green.500", bg: "green.50" }}
            onClick={onToggleStatus}
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

        <HStack spacing={2}>
          <IconButton
            aria-label="Edit agenda item"
            icon={<FiEdit />}
            size="sm"
            variant="ghost"
            onClick={onEdit}
          />
          <IconButton
            aria-label="Delete agenda item"
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={onDelete}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default AgendaListItem;
