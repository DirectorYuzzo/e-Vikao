import {
  Box,
  VStack,
  Text,
  Skeleton,
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import AgendaListItem from "./AgendaListItem";
import { AgendaItem } from "../../types";

interface AgendaListProps {
  title: string;
  agendas: AgendaItem[];
  loading: boolean;
  onEdit: (agenda: AgendaItem) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const AgendaList: React.FC<AgendaListProps> = ({
  title,
  agendas,
  loading,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (loading) {
    return (
      <VStack spacing={4} align="stretch">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} height="100px" borderRadius="md" />
        ))}
      </VStack>
    );
  }

  if (agendas.length === 0) {
    return (
      <Alert status="info" borderRadius="md">
        <AlertIcon />
        No agenda items found. Create your first item to get started!
      </Alert>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      {agendas.map((agenda) => (
        <AgendaListItem
          key={agenda.id}
          item={agenda}
          onEdit={() => onEdit(agenda)}
          onDelete={() => onDelete(agenda.id)}
          onToggleStatus={() => onToggleStatus(agenda.id)}
        />
      ))}
    </VStack>
  );
};

export default AgendaList;
