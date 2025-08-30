import {
  Box,
  VStack,
  Text,
  Skeleton,
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import MeetingListItem from "./MeetingListItem";
import { Meeting } from "../../types";

interface MeetingListProps {
  meetings: Meeting[];
  loading: boolean;
  onEdit: (meeting: Meeting) => void;
  onDelete: (id: string) => void;
}

const MeetingList: React.FC<MeetingListProps> = ({
  meetings,
  loading,
  onEdit,
  onDelete,
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (loading) {
    return (
      <VStack spacing={4} align="stretch">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} height="100px" borderRadius="md" />
        ))}
      </VStack>
    );
  }

  if (meetings.length === 0) {
    return (
      <Alert status="info" borderRadius="md">
        <AlertIcon />
        No meetings found. Create your first meeting to get started!
      </Alert>
    );
  }

  // Group meetings by date
  const groupedMeetings = meetings.reduce((acc, meeting) => {
    const date = meeting.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(meeting);
    return acc;
  }, {} as Record<string, Meeting[]>);

  const sortedDates = Object.keys(groupedMeetings).sort();

  return (
    <VStack spacing={6} align="stretch">
      {sortedDates.map((date) => (
        <Box key={date}>
          <Text fontWeight="bold" fontSize="lg" mb={3} color="gray.700">
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            borderColor={borderColor}
            overflow="hidden"
          >
            <VStack
              spacing={0}
              align="stretch"
              divider={
                <Box borderBottomWidth="1px" borderColor={borderColor} />
              }
            >
              {groupedMeetings[date].map((meeting) => (
                <MeetingListItem
                  key={meeting.id}
                  meeting={meeting}
                  onEdit={() => onEdit(meeting)}
                  onDelete={() => onDelete(meeting.id)}
                />
              ))}
            </VStack>
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default MeetingList;
