import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { Meeting } from "../types";

interface MeetingFormProps {
  onSubmit: (meeting: Omit<Meeting, "id">) => void;
  onCancel: () => void;
  initialData?: Partial<Meeting>;
}

const MeetingForm: React.FC<MeetingFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const toast = useToast();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [date, setDate] = useState(initialData?.date || "");
  const [time, setTime] = useState(initialData?.time || "09:00");
  const [participantEmail, setParticipantEmail] = useState("");
  const [participants, setParticipants] = useState<string[]>(
    initialData?.participants || []
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!date) newErrors.date = "Date is required";
    if (!time) newErrors.time = "Time is required";
    if (participants.length === 0)
      newErrors.participants = "At least one participant is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddParticipant = () => {
    const email = participantEmail.trim();
    if (email && !participants.includes(email)) {
      setParticipants([...participants, email]);
      setParticipantEmail("");
      // Clear participants error if adding first participant
      if (participants.length === 0 && errors.participants) {
        setErrors((prev) => ({ ...prev, participants: "" }));
      }
    } else if (participants.includes(email)) {
      toast({
        title: "Participant already added",
        status: "warning",
        duration: 3000,
      });
    }
  };

  const handleRemoveParticipant = (email: string) => {
    setParticipants(participants.filter((p) => p !== email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      title,
      description,
      date,
      time,
      participants,
    });

    toast({
      title: "Meeting created successfully",
      status: "success",
      duration: 3000,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && participantEmail.trim()) {
      e.preventDefault();
      handleAddParticipant();
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(
          <option key={timeString} value={timeString}>
            {timeString}
          </option>
        );
      }
    }
    return options;
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        {/* Title */}
        <FormControl isInvalid={!!errors.title}>
          <FormLabel>Meeting Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter meeting title"
          />
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        </FormControl>

        {/* Description */}
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter meeting description"
            rows={3}
          />
        </FormControl>

        {/* Date and Time */}
        <HStack spacing={4} align="start">
          <FormControl isInvalid={!!errors.date}>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
            <FormErrorMessage>{errors.date}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.time}>
            <FormLabel>Time</FormLabel>
            <Select value={time} onChange={(e) => setTime(e.target.value)}>
              {generateTimeOptions()}
            </Select>
            <FormErrorMessage>{errors.time}</FormErrorMessage>
          </FormControl>
        </HStack>

        {/* Participants */}
        <FormControl isInvalid={!!errors.participants}>
          <FormLabel>Participants</FormLabel>
          <HStack>
            <Input
              value={participantEmail}
              onChange={(e) => setParticipantEmail(e.target.value)}
              placeholder="Enter participant email"
              type="email"
              onKeyPress={handleKeyPress}
            />
            <Button
              onClick={handleAddParticipant}
              colorScheme="blue"
              isDisabled={!participantEmail.trim()}
            >
              Add
            </Button>
          </HStack>
          <FormErrorMessage>{errors.participants}</FormErrorMessage>

          {/* Participant Tags */}
          {participants.length > 0 && (
            <Box mt={3}>
              <Flex wrap="wrap" gap={2}>
                {participants.map((email) => (
                  <Tag
                    key={email}
                    size="md"
                    variant="subtle"
                    colorScheme="blue"
                  >
                    <TagLabel>{email}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleRemoveParticipant(email)}
                    />
                  </Tag>
                ))}
              </Flex>
            </Box>
          )}
        </FormControl>

        {/* Action Buttons */}
        <HStack spacing={4} justify="flex-end" mt={6}>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" colorScheme="blue">
            Create Meeting
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default MeetingForm;
