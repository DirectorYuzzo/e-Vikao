import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import MeetingForm from "../forms/MeetingForm";
import { CreateMeetingDTO } from "../../types";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (meeting: CreateMeetingDTO) => void;
  initialData?: CreateMeetingDTO & { id?: string };
  isEditing?: boolean;
}

const MeetingModal: React.FC<MeetingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditing = false,
}) => {
  const handleSubmit = (meetingData: CreateMeetingDTO) => {
    onSave(meetingData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditing ? "Edit Meeting" : "Create New Meeting"}
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
