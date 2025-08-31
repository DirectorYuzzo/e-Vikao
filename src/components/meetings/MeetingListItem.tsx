import {
  Box,
  Flex,
  Text,
  Badge,
  IconButton,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2, FiUsers, FiClock } from "react-icons/fi";
import { Meeting } from "../../types";

interface MeetingListItemProps {
  meeting: Meeting;
  onEdit: () => void;
  onDelete: () => void;
}

const MeetingListItem: React.FC<MeetingListItemProps> = ({
  meeting,
  onEdit,
  onDelete,
}) => {
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  const formatDateTime = (date: string, time: string) => {
    const meetingDate = new Date(`${date}T${time}`);
    const now = new Date();
    return {
      date: meetingDate.toLocaleDateString(),
      time: meetingDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isPast: meetingDate < now,
    };
  };

  const { date, time, isPast } = formatDateTime(meeting.date, meeting.time);

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderColor={borderColor}
      _hover={{ bg: hoverBg }}
      transition="background-color 0.2s"
    >
      <Flex justify="space-between" align="start">
        <Box flex="1">
          <Flex align="center" mb={2}>
            <Text fontWeight="semibold" fontSize="lg" mr={3} color={textColor}>
              {meeting.title}
            </Text>
            <Badge colorScheme={isPast ? "gray" : "blue"}>
              {isPast ? "Past" : "Upcoming"}
            </Badge>
          </Flex>
          <Text color={subTextColor} mb={3} noOfLines={2}>
            {meeting.description}
          </Text>
          <HStack spacing={4} color={subTextColor} fontSize="sm">
            <Flex align="center">
              <FiClock style={{ marginRight: "4px" }} />{" "}
              <Text>
                {time} • {date}
              </Text>
            </Flex>
            <Flex align="center">
              <FiUsers style={{ marginRight: "4px" }} />{" "}
              <Text>{meeting.participants.length} participants</Text>
            </Flex>
          </HStack>
        </Box>

        <HStack spacing={2} ml={4}>
          <IconButton
            aria-label="Edit meeting"
            icon={<FiEdit />}
            size="sm"
            variant="ghost"
            onClick={onEdit}
          />
          <IconButton
            aria-label="Delete meeting"
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={onDelete}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default MeetingListItem;
