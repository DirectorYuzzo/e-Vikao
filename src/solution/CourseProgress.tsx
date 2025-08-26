import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Progress,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { progress } from "framer-motion";
import { useEffect, useState } from "react";

interface CourseProgressProps {
  courseName: string;
  instructor: string;
  currentProgress: number;
}
const CourseProgress = ({
  courseName,
  instructor,
  currentProgress: initialProgress,
}: CourseProgressProps) => {
  const [currentProgress, setCurrentProgress] = useState(initialProgress);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const toast = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedProgress((prev) => Math.min(prev + 1, currentProgress));
    }, 20);

    return () => clearInterval(timer);
  }, [currentProgress]);

  const handleComplete = () => {
    const newProgress = Math.min(currentProgress + 25, 100);
    setCurrentProgress(newProgress);

    if (newProgress === 100) {
      toast({
        title: "Course Completed!",
        description: `You've finishes ${courseName} `,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const progressColor = () => {
    if (currentProgress <= 30) return "red";
    if (currentProgress <= 70) return "yellow";
    return "green";
  };

  return (
    <VStack
      align="start"
      spacing={4}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
      width="100%"
      maxWidth="400px"
    >
      <Box>
        <Text fontWeight="bold" fontSize="lg">
          {courseName}
        </Text>
        <Text fontSize="sm" color="green.500">
          by {instructor}
        </Text>
      </Box>
      <HStack width="full" spacing={4}>
        <CircularProgress
          value={currentProgress}
          color={progressColor()}
          size="80px"
        >
          <CircularProgressLabel>{currentProgress} %</CircularProgressLabel>
        </CircularProgress>
        <Progress
          value={animatedProgress}
          width="100%"
          colorScheme={progressColor()}
          size="md"
          borderRadius="full"
          transition="all 0.3s ease"
        />
        <Text fontSize="sm" fontWeight="medium" minWidth="40px">
          {currentProgress} %
        </Text>
      </HStack>
      <Button
        colorScheme="blue"
        size="sm"
        onClick={handleComplete}
        isDisabled={currentProgress >= 100}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "md",
        }}
        transition="all 0.2s"
      >
        {currentProgress >= 100 ? "Completed" : "Mark Completed (+25%)"}
      </Button>
    </VStack>
  );
};

export default CourseProgress;
