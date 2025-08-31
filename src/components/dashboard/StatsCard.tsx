import {
  Box,
  Text,
  Flex,
  Icon,
  useBreakpointValue,
  CircularProgress,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

interface StatsCardProps {
  title: string;
  stat: string;
  icon: IconType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  stat,
  icon,
  trend,
  description,
}) => {
  const isCompact = useBreakpointValue({ base: true, md: false });

  const trendColor = trend?.isPositive ? "green.500" : "red.500";
  const trendIcon = trend?.isPositive ? <FiTrendingUp /> : <FiTrendingDown />;

  return (
    <Box
      bg="white"
      p={isCompact ? 4 : 6}
      borderRadius="lg"
      boxShadow="base"
      borderWidth="1px"
      borderColor="gray.200"
      height="100%"
    >
      <Flex justify="space-between" align="start" mb={isCompact ? 2 : 4}>
        <Box flex="1">
          <Text
            fontSize={isCompact ? "xs" : "sm"}
            color="gray.600"
            fontWeight="medium"
            mb={1}
          >
            {title}
          </Text>
          <Text
            fontSize={isCompact ? "xl" : "3xl"}
            fontWeight="bold"
            color="gray.800"
          >
            {stat}
          </Text>
        </Box>
        <Flex
          w={isCompact ? 8 : 12}
          h={isCompact ? 8 : 12}
          bg="blue.100"
          borderRadius="lg"
          align="center"
          justify="center"
          color="blue.600"
          flexShrink={0}
          ml={2}
        >
          <Icon as={icon} w={isCompact ? 4 : 6} h={isCompact ? 4 : 6} />
        </Flex>
      </Flex>

      {(trend || description) && (
        <Box mt={isCompact ? 1 : 2}>
          {trend && (
            <Flex align="center" mb={isCompact ? 1 : 2}>
              <Text
                fontSize={isCompact ? "xs" : "sm"}
                color={trendColor}
                fontWeight="medium"
              >
                {trendIcon}
              </Text>
              <Text ml={2}> {Math.abs(trend.value)}%</Text>
              <Text fontSize={isCompact ? "xs" : "sm"} color="gray.600" ml={2}>
                from last week
              </Text>
            </Flex>
          )}

          {description && (
            <Text fontSize={isCompact ? "xs" : "sm"} color="gray.600">
              {description}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default StatsCard;
