import { VStack, Text, Box, Skeleton } from "@chakra-ui/react";
// import AgendaStatus from "./AgendaStatus";
import { AgendaItem } from "../types";

interface AgendaListProps {
  items: AgendaItem[];
  isLoading?: boolean;
}

const AgendaList: React.FC<AgendaListProps> = ({
  items,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <VStack spacing={3} align="stretch">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height="60px" borderRadius="md" />
        ))}
      </VStack>
    );
  }

  if (items.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Text color="gray.500">No agenda items found</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={3} align="stretch">
      {items.map((item) => (
        <Box
          key={item.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="sm"
        >
          <Text fontWeight="medium" mb={2}>
            {item.title}
          </Text>
          {/* <AgendaStatus priority={item.priority} /> */}
        </Box>
      ))}
    </VStack>
  );
};

export default AgendaList;
