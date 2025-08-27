import {
  Box,
  Text,
  Badge,
  Button,
  Flex,
  Avatar,
  Skeleton,
} from "@chakra-ui/react";
import { Meeting } from "../types";

interface MeetingCardProps {
  meeting: Meeting | null;
  isLoading?: boolean;
  onJoinMeeting?: () => void;
  onViewAgenda?: () => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  meeting,
  isLoading = false,
  onJoinMeeting,
  onViewAgenda,
}) => {
  if (isLoading) {
    return (
      <Box bg="white" p={6} borderRadius="lg" boxShadow="base">
        <Skeleton height="24px" width="60%" mb={4} />
        <Skeleton height="20px" width="40%" mb={6} />
        <Skeleton height="20px" mb={2} />
        <Skeleton height="20px" mb={4} />
        <Flex>
          <Skeleton height="40px" width="120px" mr={3} />
          <Skeleton height="40px" width="120px" />
        </Flex>
      </Box>
    );
  }

  if (!meeting) {
    return (
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="base"
        textAlign="center"
      >
        <Text color="gray.500">No upcoming meetings</Text>
        <Button mt={4} colorScheme="blue" size="sm">
          Schedule Meeting
        </Button>
      </Box>
    );
  }

  // Format the time to display in a user-friendly way
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${
      hour >= 12 ? "PM" : "AM"
    }`;
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="base">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="semibold">
          Next Meeting
        </Text>
        <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
          {formatTime(meeting.time)}
        </Badge>
      </Flex>

      <Flex align="center" mb={4}>
        <Avatar size="sm" name="Philip" bg="blue.500" mr={3} />
        <Text fontWeight="medium">Hosted by Philip</Text>
      </Flex>

      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {meeting.title}
      </Text>
      <Text color="gray.600" mb={4}>
        {meeting.description}
      </Text>

      <Flex>
        <Button colorScheme="blue" mr={3} onClick={onJoinMeeting}>
          Join Meeting
        </Button>
        <Button variant="outline" onClick={onViewAgenda}>
          View Agenda
        </Button>
      </Flex>
    </Box>
  );
};

export default MeetingCard;
