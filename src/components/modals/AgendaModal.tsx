import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import AgendaForm from "../forms/AgendaForm";
import { AgendaItem } from "../../types";

interface AgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<AgendaItem, "id">) => void;
  initialData?: AgendaItem;
  isEditing?: boolean;
}

const AgendaModal: React.FC<AgendaModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditing = false,
}) => {
  const handleSubmit = (itemData: Omit<AgendaItem, "id">) => {
    onSave(itemData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditing ? "Edit Agenda Item" : "Create New Agenda Item"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <AgendaForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            initialData={initialData}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AgendaModal;
