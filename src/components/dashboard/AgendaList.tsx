import {
  Box,
  Text,
  VStack,
  Button,
  Flex,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import AgendaItem from "./AgendaItem";
import AgendaModal from "../modals/AgendaModal";
import { AgendaItem as AgendaItemType } from "../../types";

interface AgendaListProps {
  title: string;
  items: AgendaItemType[];
  isLoading?: boolean;
  onAddItem?: (item: Omit<AgendaItemType, "id">) => void;
  onEditItem?: (id: string, item: Omit<AgendaItemType, "id">) => void;
  onDeleteItem?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
}

const AgendaList: React.FC<AgendaListProps> = ({
  title,
  items,
  isLoading = false,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onToggleStatus,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) {
    return (
      <Box bg="white" p={6} borderRadius="lg" boxShadow="base">
        <Flex justify="space-between" align="center" mb={4}>
          <Skeleton height="24px" width="40%" />
          <Skeleton height="40px" width="120px" />
        </Flex>
        <VStack spacing={3} align="stretch">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height="100px" borderRadius="md" />
          ))}
        </VStack>
      </Box>
    );
  }

  const handleAdd = (itemData: Omit<AgendaItemType, "id">) => {
    onAddItem?.(itemData);
    onClose();
  };

  return (
    <>
      <Box bg="white" p={6} borderRadius="lg" boxShadow="base" h="100%">
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
          <Button
            leftIcon={<FiPlus />}
            colorScheme="blue"
            size="sm"
            onClick={onOpen}
          >
            Add Item
          </Button>
        </Flex>

        {items.length === 0 ? (
          <Box textAlign="center" py={8} color="gray.500">
            <Text>No agenda items yet</Text>
            <Button mt={3} size="sm" onClick={onOpen}>
              Create your first item
            </Button>
          </Box>
        ) : (
          <VStack spacing={3} align="stretch">
            {items.map((item) => (
              <AgendaItem
                key={item.id}
                item={item}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </VStack>
        )}
      </Box>
      <AgendaModal isOpen={isOpen} onClose={onClose} onSave={handleAdd} />
    </>
  );
};

export default AgendaList;
