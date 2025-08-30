import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface StatsCardProps {
  title: string;
  stat: string;
  icon: IconType;
  description?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  stat,
  icon,
  description,
}) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="base"
      borderWidth="1px"
      borderColor="gray.200"
      height="100%"
    >
      <Flex justify="space-between" align="start" mb={4}>
        <Box flex="1">
          <Text fontSize="sm" color="gray.600" fontWeight="medium" mb={1}>
            {title}
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color="gray.800">
            {stat}
          </Text>
        </Box>
        <Flex
          w={12}
          h={12}
          bg="blue.100"
          borderRadius="lg"
          align="center"
          justify="center"
          color="blue.600"
          flexShrink={0}
          ml={2}
        >
          <Icon as={icon} w={6} h={6} />
        </Flex>
      </Flex>
      {description && (
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>
      )}
    </Box>
  );
};

export default StatsCard;
