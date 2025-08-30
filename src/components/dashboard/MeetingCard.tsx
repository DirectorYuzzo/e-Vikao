import { Box, Text, Badge, Button, Flex, Avatar } from "@chakra-ui/react";
import { Meeting } from "../../types";

interface MeetingCardProps {
  meeting: Meeting | null;
  isLoading?: boolean;
  onJoinMeeting?: () => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  meeting,
  isLoading = false,
  onJoinMeeting,
}) => {
  if (isLoading) {
    return (
      <Box bg="white" p={6} borderRadius="lg" boxShadow="base">
        <Text>Loading meeting details...</Text>
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
        <Text color="gray.500" mb={3}>
          No upcoming meetings
        </Text>
        <Button size="sm" colorScheme="blue">
          Schedule Meeting
        </Button>
      </Box>
    );
  }

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
        <Badge
          colorScheme="blue"
          px={3}
          py={1}
          borderRadius="full"
          fontSize="xs"
        >
          {formatTime(meeting.time)}
        </Badge>
      </Flex>

      <Flex align="center" mb={4}>
        <Avatar size="sm" name="Host" bg="blue.500" mr={3} />
        <Text fontWeight="medium" fontSize="sm">
          Hosted by Team Lead
        </Text>
      </Flex>

      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {meeting.title}
      </Text>

      <Text color="gray.600" fontSize="sm" mb={4}>
        {meeting.description}
      </Text>

      <Button colorScheme="blue" size="md" onClick={onJoinMeeting} width="100%">
        Join Meeting
      </Button>
    </Box>
  );
};

export default MeetingCard;
