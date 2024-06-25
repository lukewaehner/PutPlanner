import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Spinner, Flex, Avatar } from "@chakra-ui/react";

function InstructorCard({ instructor }) {
  const [instructorData, setInstructorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructorData = async () => {
      if (!instructor) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5001/instructors/${instructor}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setInstructorData(data);
      } catch (error) {
        console.error("Error fetching instructor:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorData();
  }, [instructor]);

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">Error: {error}</Text>;
  if (!instructorData) return null;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={2}
      maxWidth="300px"
      minWidth="250px"
      textAlign="center"
    >
      <Flex direction="column" align="center" mb={4}>
        <Heading as="h3" size="md" mb={2}>
          {instructorData.name || "Unknown Name"}
        </Heading>
        <Avatar
          size="xl"
          name={instructorData.name || "Unknown"}
          src={instructorData.picture}
          mb={4}
        />
        <Text fontSize="sm" mb={2}>
          Rating: {instructorData.rating || "Unknown Rating"}
        </Text>
      </Flex>
      <Text fontSize="sm">{instructorData.bio || "No bio available"}</Text>
    </Box>
  );
}

export default InstructorCard;
