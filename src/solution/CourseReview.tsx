import { useState } from "react";
import {
  Box,
  Text,
  Textarea,
  Button,
  Flex,
  IconButton,
  VStack,
  HStack,
  Divider,
  useToast,
  Collapse,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import {
  FaStar,
  FaRegStar,
  FaArrowUp,
  FaReply,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: Date;
  upvotes: number;
  professorResponse?: string;
}

interface CourseReviewProps {
  courseId: string;
  initialReviews: Review[];
}

const StarRating = ({ rating, setRating, isEditable = true }: any) => {
  return (
    <HStack spacing={1}>
      {[1, 2, 3, 4, 5].map((star) => (
        <IconButton
          key={star}
          icon={star <= rating ? <FaStar /> : <FaRegStar />}
          onClick={() => isEditable && setRating(star)}
          color={star <= rating ? "yellow.400" : "gray.300"}
          variant="ghost"
          size="sm"
          aria-label={`Rate ${star} star`}
          _hover={isEditable ? { transform: "scale(1.2)" } : {}}
          transition="all 0.2s"
        />
      ))}
    </HStack>
  );
};

export const CourseReviews = ({
  courseId,
  initialReviews,
}: CourseReviewProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [expandedResponses, setExpandedResponses] = useState<
    Record<string, boolean>
  >({});
  const toast = useToast();

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const handleSubmitReview = () => {
    if (!isValidReview) return;

    const newReview: Review = {
      id: Date.now().toString(),
      author: "You", // In real app, use actual user name
      rating: newRating,
      comment: newComment,
      date: new Date(),
      upvotes: 0,
    };

    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewComment("");

    toast({
      title: "Review Submitted!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpvote = (reviewId: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? { ...review, upvotes: review.upvotes + 1 }
          : review
      )
    );
  };

  const toggleResponse = (reviewId: string) => {
    setExpandedResponses((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const isValidReview = newRating > 0 && newComment.length >= 10;

  return (
    <Box maxW="800px" mx="auto">
      {/* Header */}
      <Flex align="center" mb={6}>
        <Text fontSize="xl" fontWeight="bold" mr={4}>
          Course Reviews
        </Text>
        <StarRating
          rating={Math.round(averageRating)}
          setRating={() => {}}
          isEditable={false}
        />
        <Text ml={2} color="gray.600">
          ({averageRating.toFixed(1)}) - {reviews.length} reviews
        </Text>
      </Flex>

      {/* New Review Form */}
      <Box bg="gray.50" p={4} borderRadius="lg" mb={8}>
        <Text fontWeight="medium" mb={2}>
          Share your experience
        </Text>
        <StarRating rating={newRating} setRating={setNewRating} />
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="What did you think of this course?"
          mt={3}
          minH="120px"
        />
        <Flex justify="flex-end" mt={3}>
          <Button
            colorScheme="blue"
            onClick={handleSubmitReview}
            isDisabled={!isValidReview}
            leftIcon={<FaReply />}
          >
            Submit Review
          </Button>
        </Flex>
      </Box>

      {/* Reviews List */}
      <VStack spacing={6} align="stretch">
        {reviews.map((review) => (
          <Box key={review.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Flex justify="space-between">
              <Flex align="center">
                <Avatar name={review.author} size="sm" mr={3} />
                <Box>
                  <Text fontWeight="bold">{review.author}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {formatDistanceToNow(review.date)} ago
                  </Text>
                </Box>
              </Flex>
              <StarRating
                rating={review.rating}
                setRating={() => {}}
                isEditable={false}
              />
            </Flex>

            <Text mt={3}>{review.comment}</Text>

            <Flex mt={4} align="center">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<FaArrowUp />}
                onClick={() => handleUpvote(review.id)}
              >
                Helpful ({review.upvotes})
              </Button>

              {review.professorResponse && (
                <Button
                  variant="ghost"
                  size="sm"
                  ml={3}
                  leftIcon={
                    expandedResponses[review.id] ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )
                  }
                  onClick={() => toggleResponse(review.id)}
                >
                  {expandedResponses[review.id]
                    ? "Hide Response"
                    : "Professor Response"}
                </Button>
              )}
            </Flex>

            {review.professorResponse && (
              <Collapse in={expandedResponses[review.id]}>
                <Box
                  mt={3}
                  p={3}
                  bg="blue.50"
                  borderRadius="md"
                  borderLeft="4px solid"
                  borderColor="blue.200"
                >
                  <Flex align="center" mb={2}>
                    <Badge colorScheme="blue" mr={2}>
                      Professor
                    </Badge>
                    <Text fontSize="sm" color="gray.500">
                      {formatDistanceToNow(
                        new Date(review.date.getTime() + 86400000)
                      )}{" "}
                      ago
                    </Text>
                  </Flex>
                  <Text>{review.professorResponse}</Text>
                </Box>
              </Collapse>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
