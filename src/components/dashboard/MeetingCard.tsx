import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Skeleton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";

interface Meeting {
  id: string;
  title: string;
  data: string;
  time: string;
  description: string;
  participants: string[];
}

interface Props {
  meeting: Meeting | null;
  onJoinMeeting?: () => void;
  onViewAgenda?: () => void;
  isLoading?: boolean;
}

const MeetingCard = ({
  meeting,
  onJoinMeeting,
  onViewAgenda,
  isLoading = false,
}: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isLoading) {
    return (
      <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" boxShadow="base">
        <Skeleton height="24px" width="60%" mb={4} />
        <Skeleton height="20px" width="40%" mb={6} />
        <Skeleton height="20px" mb={2} />
        <Skeleton height="20px" mb={4} />
        <Flex>
          <Skeleton height="40px" width="120px" mr={3} />
          <Skeleton height="40px" width="120px" mb={6} />
        </Flex>
      </Box>
    );
  }

  if (!meeting) {
    return (
      <Box
        bg="white"
        p={{ base: 4, md: 6 }}
        borderRadius="lg"
        boxShadow="base"
        textAlign="center"
      >
        <Text color="gray.500">No Upcaming meeting </Text>
        <Button mt={4} colorScheme="blue" size="sm">
          Schedule Meeting
        </Button>
      </Box>
    );
  }

  const formateTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour} : ${minutes} ${
      hour >= 12 ? "PM" : "AM"
    } `;
  };
  return (
    <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" boxShadow="base">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight="semibold">
          Next Meeting
        </Text>
        <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
          {formateTime(meeting.time)}
        </Badge>
      </Flex>
      <Flex align="center" mb={4}>
        <Avatar size="sm" name="Yuzzo" bg="blue.500" mr={3} />
        <Text fontWeight="medium">Hosted By Yuzzo</Text>
      </Flex>

      <Text fontSize="sm" ml={3} color="gray.600">
        {meeting.participants.length} participants
      </Text>
      {/* Meeting detaild */}
      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={2}>
        {meeting.title}
      </Text>
      <Text color="gray.600" mb={4}>
        {meeting.description}
      </Text>

      {/* Action button */}
      <Flex direction={{ base: "column", sm: "row" }} gap={3}>
        <Button
          colorScheme="blue"
          flex={{ base: 1, sm: "none" }}
          size={{ base: "sm", md: "md" }}
          onClick={onJoinMeeting}
        >
          Join Button
        </Button>
        <Button
          variant="outline"
          flex={{ base: 1, sm: "none" }}
          onClick={onViewAgenda}
          size={{ base: "sm", md: "md" }}
        >
          View Agenda
        </Button>
      </Flex>
    </Box>
  );
};

export default MeetingCard;
