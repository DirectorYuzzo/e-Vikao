import { Box, Text, Flex, VStack, Button, Skeleton } from "@chakra-ui/react";
import React from "react";
import { FiPlus } from "react-icons/fi";
import AgendaItem from "./AgendaItem";

export interface AgendaItem {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "high" | "medium" | "low";
  dueDate: string;
}

interface Props {
  title: string;
  items: AgendaItem[];
  onAddItem?: () => void;
  onToggleStatus?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  isLoading?: boolean;
}

const AgendaList = ({
  title,
  items,
  onAddItem,
  onToggleStatus,
  onViewDetails,
  isLoading = false,
}: Props) => {
  if (isLoading) {
    return (
      <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" boxShadow="base">
        <Flex justify="space-between" align="center" mb={4}>
          <Skeleton height="24px" width="40%" />
          <Skeleton height="20px" width="120px" />
        </Flex>
        <VStack spacing={3} align="stretch">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height="100px" borderRadius="md" />
          ))}
        </VStack>
      </Box>
    );
  }

  return (
    <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" boxShadow="base">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="semibold">
          {title}
        </Text>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          size="sm"
          onClick={onAddItem}
        >
          Add Item
        </Button>
      </Flex>

      {/* Agenda Item componets */}
      {items.length === 0 ? (
        <Box textAlign="center" py={8} color="gray.500">
          <Text>No Agenda items yet</Text>
          <Button onClick={onAddItem} mt={3} size="sm">
            Create you first item
          </Button>
        </Box>
      ) : (
        <VStack spacing={3} align="stretch">
          {items.map((item) => (
            <AgendaItem
              item={item}
              key={item.id}
              onToggleStatus={onToggleStatus}
              onViewDetails={onViewDetails}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default AgendaList;
