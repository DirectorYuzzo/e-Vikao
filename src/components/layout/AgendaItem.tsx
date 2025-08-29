import { Box, Flex, IconButton, Badge, HStack, Text } from "@chakra-ui/react";
import React from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiMoreVertical,
  FiPlay,
} from "react-icons/fi";

interface AgendaItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    priority: "high" | "medium" | "low";
    dueDate: string;
  };
  onToggleStatus?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const AgendaItem = ({
  item,
  onToggleStatus,
  onViewDetails,
}: AgendaItemProps) => {
  // To get the color based on their priority
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
  //  for icon update
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complited":
        return FiCheckCircle;
      case "in-progress":
        return FiPlay;
      case "pending":
        return FiAlertCircle;
      default:
        return FiAlertCircle;
    }
  };
  //get color based on their status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "complited":
        return "green";
      case "in-progress":
        return "blue";
      case "pending":
        return "gray";
      default:
        return "gray";
    }
  };
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      boxShadow="sm
    "
      _hover={{ boxShadow: "md" }}
      transition="box-shadow: 0.2s"
    >
      <Flex justify="space-between" align="flex-start">
        <Flex align="center" flex="1">
          <IconButton
            aria-label="Toggle status"
            icon={<Box as={getStatusIcon(item.status)} />}
            size="sm"
            variant="ghost"
            color={getStatusColor(item.status)}
            _hover={{
              color: getStatusColor(item.status),
              bg: `${getStatusColor(item.status)}.50`,
            }}
            onClick={() => onToggleStatus && onToggleStatus(item.id)}
            mr={3}
          />
          <Box flex="1">
            <Text fontSize="medium" mb={1}>
              {item.title}
            </Text>
            <Text fontSize="sm" color="gray.600" mb={2}>
              {item.description}
            </Text>
            <HStack spacing={3} flexWrap="wrap">
              <Badge colorScheme={getPriorityColor(item.priority)} size="sm">
                {item.priority} priority
              </Badge>
              <Flex align="center" color="gray.500">
                <FiClock size={14} />
                <Text fontSize="sm" ml={1}>
                  Due: {item.dueDate}
                </Text>
              </Flex>
              <Badge colorScheme={getStatusColor(item.status)} size="sm">
                {item.status}
              </Badge>
            </HStack>
          </Box>
        </Flex>

        <IconButton
          aria-label="More Options"
          icon={<FiMoreVertical />}
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails && onViewDetails(item.id)}
        />
      </Flex>
    </Box>
  );
};

export default AgendaItem;
