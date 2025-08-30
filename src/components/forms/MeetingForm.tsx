import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CreateMeetingDTO } from "../../types";

interface MeetingFormProps {
  onSubmit: (meeting: CreateMeetingDTO) => void;
  onCancel: () => void;
  initialData?: CreateMeetingDTO;
}

const MeetingForm: React.FC<MeetingFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState("");
  const toast = useToast();

  // Pre-fill form if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDate(initialData.date);
      setTime(initialData.time);
      setParticipants(initialData.participants);
    }
  }, [initialData]);

  const handleAddParticipant = () => {
    if (
      newParticipant.trim() &&
      !participants.includes(newParticipant.trim())
    ) {
      setParticipants([...participants, newParticipant.trim()]);
      setNewParticipant("");
    } else if (participants.includes(newParticipant.trim())) {
      toast({
        title: "Participant already added",
        status: "warning",
        duration: 3000,
      });
    }
  };

  const handleRemoveParticipant = (participant: string) => {
    setParticipants(participants.filter((p) => p !== participant));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !date || !time || participants.length === 0) {
      toast({
        title: "Please fill all required fields",
        status: "error",
        duration: 3000,
      });
      return;
    }

    onSubmit({
      title,
      description,
      date,
      time,
      participants,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newParticipant.trim()) {
      e.preventDefault();
      handleAddParticipant();
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Meeting Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter meeting title"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter meeting description"
            rows={3}
          />
        </FormControl>

        <HStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Time</FormLabel>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </FormControl>
        </HStack>

        <FormControl isRequired>
          <FormLabel>Participants</FormLabel>
          <HStack>
            <Input
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              placeholder="Enter participant email"
              type="email"
              onKeyPress={handleKeyPress}
            />
            <Button
              onClick={handleAddParticipant}
              colorScheme="blue"
              isDisabled={!newParticipant.trim()}
            >
              Add
            </Button>
          </HStack>

          {participants.length > 0 && (
            <Box mt={2}>
              {participants.map((participant) => (
                <Box
                  key={participant}
                  display="inline-block"
                  bg="blue.100"
                  borderRadius="md"
                  px={2}
                  py={1}
                  mr={2}
                  mb={2}
                >
                  {participant}
                  <Button
                    size="xs"
                    ml={2}
                    variant="ghost"
                    onClick={() => handleRemoveParticipant(participant)}
                  >
                    ×
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </FormControl>

        <HStack spacing={4} justify="flex-end" mt={6}>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" colorScheme="blue">
            {initialData ? "Update Meeting" : "Create Meeting"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default MeetingForm;
