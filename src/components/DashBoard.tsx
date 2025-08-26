import {
  Card,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaCalendarCheck, FaCalendarDay } from "react-icons/fa";

const DashBoard = () => {
  return (
    <Grid
      display="grid"
      gridTemplateAreas="1px"
      gap={2}
      justifyContent="center"
    >
      <Card variant="outline">
        <Flex>
          <VStack bg="purple" borderRadius={5} padding={2}>
            <FaCalendarDay size={29} />
            <Text>Tue</Text>
          </VStack>
          <VStack px={1}>
            <Heading>Next</Heading>
            <Text>11:00AM</Text>
          </VStack>
        </Flex>
      </Card>
      <Card variant="outline">
        <Flex>
          <VStack bg="purple" borderRadius={5} padding={2}>
            <FaCalendarDay size={29} />
            <Text>Tue</Text>
          </VStack>
          <VStack px={1}>
            <Heading>Next</Heading>
            <Text>11:00AM</Text>
          </VStack>
        </Flex>
      </Card>
      <Card variant="outline">
        <Flex>
          <VStack bg="purple" borderRadius={5} padding={2}>
            <FaCalendarDay size={29} />
            <Text>Tue</Text>
          </VStack>
          <VStack px={1}>
            <Heading>Next</Heading>
            <Text>11:00AM</Text>
          </VStack>
        </Flex>
      </Card>
    </Grid>
  );
};

export default DashBoard;
