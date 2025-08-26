import { Button, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React, { useState } from "react";

interface ReactionButtonProps {
  emoji: string;
  count: number;
  userReacted?: boolean;
  onClick?: () => void;
}

const pop = keyframes`
    0% {transform: scale(1);}
    50% {transform: scale(1.2);}
    100% {transform: scale(1);}
`;

export const ReactionButton = ({
  emoji,
  count: initialCount,
  userReacted: inialUserReacted,
  onClick,
}: ReactionButtonProps) => {
  const [count, setCount] = useState(initialCount);
  const [userReacted, setUserReacted] = useState(inialUserReacted);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    const newReactionState = !userReacted;
    setUserReacted(newReactionState);
    setCount(newReactionState ? count + 1 : count - 1);

    setIsAnimating(true);

    onClick?.();
  };

  return (
    <Button
      size="sm"
      variant={userReacted ? "solid" : "outline"}
      colorScheme={userReacted ? "blue" : "gray"}
      borderRadius="full"
      px={2}
      onClick={handleClick}
      _hover={{
        transform: "Scale(1.05)",
        shadow: "md",
      }}
      animation={isAnimating ? `${pop} 0.3s ease` : undefined}
      onAnimationEnd={() => setIsAnimating(false)}
    >
      <Text fontSize="lg" mr={1}>
        {emoji}
      </Text>
      <Text fontSize="sm"> {count}</Text>
    </Button>
  );
};

export default ReactionButton;
