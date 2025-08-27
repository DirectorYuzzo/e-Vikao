import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Meeting } from "../types";
import MeetingForm from "./MeetingForm";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (meeting: Omit<Meeting, "id">) => void;
  initialData?: Partial<Meeting>;
}

const MeetingModal: React.FC<MeetingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const handleSubmit = (meetingData: Omit<Meeting, "id">) => {
    onSave(meetingData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialData?.id ? "Edit Meeting" : "Create New Meeting"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <MeetingForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            initialData={initialData}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MeetingModal;
