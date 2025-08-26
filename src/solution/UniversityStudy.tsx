import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Flex,
  Box,
  Progress,
  useToast,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { FiCalendar, FiMapPin, FiUsers, FiCheckCircle } from "react-icons/fi";
import { format, formatDistanceToNow, isAfter } from "date-fns";

interface UniversityEventProps {
  eventName: string;
  organizer: string;
  date: Date;
  location: string;
  currentAttendees: number;
  maxCapacity: number;
  registrationDeadline: Date;
  isRegistered?: boolean;
}

export const UniversityEventCard = ({
  eventName,
  organizer,
  date,
  location,
  currentAttendees: initialAttendees,
  maxCapacity,
  registrationDeadline,
  isRegistered = false,
}: UniversityEventProps) => {
  const [registered, setRegistered] = useState(isRegistered);
  const [attendees, setAttendees] = useState(initialAttendees);
  const toast = useToast();

  // Date formatting logic
  const isEventSoon = date.getTime() - Date.now() < 604800000; // 1 week
  const dateText = isEventSoon
    ? `${formatDistanceToNow(date, { addSuffix: true })}`
    : format(date, "MMM d, yyyy • h:mm a");

  // Registration logic
  const isPastDeadline = isAfter(new Date(), registrationDeadline);
  const isFull = attendees >= maxCapacity;

  // Capacity meter color
  const capacityPercent = (attendees / maxCapacity) * 100;
  const capacityColor =
    capacityPercent >= 95 ? "red" : capacityPercent >= 80 ? "orange" : "green";

  const handleRegister = () => {
    if (isPastDeadline || isFull) return;

    const newRegisteredState = !registered;
    setRegistered(newRegisteredState);
    setAttendees(newRegisteredState ? attendees + 1 : attendees - 1);

    toast({
      title: newRegisteredState ? "Registered!" : "Registration Cancelled",
      description: newRegisteredState
        ? `You're attending ${eventName}`
        : `You're no longer attending ${eventName}`,
      status: newRegisteredState ? "success" : "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Card
      variant="outline"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "lg",
        transition: "all 0.2s ease",
      }}
    >
      <CardBody>
        <Flex direction="column" gap={3}>
          <Box>
            <Heading size="md">{eventName}</Heading>
            <Text fontSize="sm" color="gray.500" mt={1}>
              {organizer}
            </Text>
          </Box>

          <Flex align="center" gap={3}>
            <Flex align="center" gap={1}>
              <Icon as={FiCalendar} />
              <Text fontSize="sm">{dateText}</Text>
            </Flex>

            <Flex align="center" gap={1}>
              <Icon as={FiMapPin} />
              <Text fontSize="sm">{location}</Text>
            </Flex>
          </Flex>

          <Box mt={2}>
            <Flex justify="space-between" mb={1}>
              <Text fontSize="sm" fontWeight="medium">
                <Icon as={FiUsers} mr={1} />
                {attendees}/{maxCapacity} registered
                {!isFull && ` (${maxCapacity - attendees} spots left)`}
              </Text>
              {isFull && (
                <Badge colorScheme="red" variant="subtle">
                  Full
                </Badge>
              )}
            </Flex>
            <Progress
              value={capacityPercent}
              colorScheme={capacityColor}
              size="sm"
              borderRadius="full"
            />
          </Box>
        </Flex>
      </CardBody>

      <CardFooter>
        <Button
          size="sm"
          width="full"
          colorScheme={
            registered
              ? "green"
              : isPastDeadline
              ? "gray"
              : isFull
              ? "red"
              : "blue"
          }
          onClick={handleRegister}
          leftIcon={registered ? <FiCheckCircle /> : undefined}
          isDisabled={isPastDeadline || isFull}
        >
          {registered
            ? "Registered"
            : isPastDeadline
            ? "Registration Closed"
            : isFull
            ? "Event Full"
            : "Register Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};
