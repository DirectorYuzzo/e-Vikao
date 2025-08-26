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
  Badge,
  useToast,
  Avatar,
  AvatarGroup,
  Modal,
} from "@chakra-ui/react";
import { FiBook, FiClock, FiUsers } from "react-icons/fi";

interface StudyGroupProps {
  groupName: string;
  subject: string;
  currentMembers: number;
  maxMembers: number;
  meetingTime: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  isJoined?: boolean;
}

export const StudyGroupCard = ({
  groupName,
  subject,
  currentMembers: initialMembers,
  maxMembers,
  meetingTime,
  skillLevel,
  isJoined = false,
}: StudyGroupProps) => {
  const [joined, setJoined] = useState(isJoined);
  const [members, setMembers] = useState(initialMembers);
  const toast = useToast();

  const skillColors = {
    beginner: "green",
    intermediate: "yellow",
    advanced: "red",
  };

  const handleJoin = () => {
    const newJoinedState = !joined;
    setJoined(newJoinedState);
    setMembers(newJoinedState ? members + 1 : members - 1);

    toast({
      title: newJoinedState ? "Joined Group!" : "Left Group",
      description: newJoinedState
        ? `You've joined ${groupName}`
        : `You've left ${groupName}`,
      status: newJoinedState ? "success" : "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Card
      variant="outline"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "md",
        transition: "all 0.2s ease",
      }}
    >
      <CardBody>
        <Flex direction="column" gap={3}>
          <Box>
            <Heading size="md">{groupName}</Heading>
            <Text fontSize="sm" color="gray.500" mt={1}>
              {subject}
            </Text>
          </Box>

          <Flex gap={4} align="center">
            <Badge
              colorScheme={skillColors[skillLevel]}
              px={2}
              py={1}
              borderRadius="full"
            >
              {skillLevel}
            </Badge>

            <Flex align="center" gap={1}>
              <FiUsers />
              <Text fontSize="sm">
                {members}/{maxMembers} members
              </Text>
            </Flex>
          </Flex>

          <Flex align="center" gap={2}>
            <FiClock />
            <Text fontSize="sm">{meetingTime}</Text>
          </Flex>

          <AvatarGroup size="sm" max={5} mt={2}>
            <Avatar name="Student 1" />
            <Avatar name="Student 2" />
            <Avatar name="Student 3" />
            {members > 3 && <Avatar name={`+${members - 3}`} />}
          </AvatarGroup>
        </Flex>
      </CardBody>

      <CardFooter>
        <Button
          size="sm"
          width="full"
          colorScheme={joined ? "red" : "blue"}
          onClick={handleJoin}
          leftIcon={<FiBook />}
        >
          {joined ? "Leave Group" : "Join Group"}
        </Button>
      </CardFooter>
    </Card>
  );
};
