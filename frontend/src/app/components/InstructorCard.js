import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

function InstructorCard({ instructor }) {
  console.log("Instructor:", instructor); // Log the instructor object to debug

  if (!instructor) {
    return null;
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={2}
      maxWidth="300px"
    >
      <Heading as="h3" size="md" mb={2}>
        {instructor.name}
      </Heading>
      <Text fontSize="sm" mb={2}>
        {instructor.role}
      </Text>
      <Text fontSize="sm">{instructor.bio}</Text>
    </Box>
  );
}

export default InstructorCard;
