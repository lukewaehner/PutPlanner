"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";
import InstructorCard from "../../components/InstructorCard"; // Make sure this component exists

function ClubPage() {
  const [club, setClub] = useState(null);

  useEffect(() => {
    // Simulate fetching club data using clubID (replace with actual fetch)
    const fetchClubData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/clubs/${clubID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setClub(data);
      } catch (error) {
        console.error("Error fetching club:", error);
      }
    };

    // Replace clubID with actual logic to extract ID from pathname
    const pathname = window.location.pathname;
    const clubID = pathname.split("/").pop();

    if (clubID) {
      fetchClubData();
    }
  }, []);

  if (!club) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      {/* Club Info Section */}
      <Box
        style={{
          backgroundImage: `url(${club.image})`,
        }}
        bgColor="gray.200" // Fallback color
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        height="400px"
        position="relative"
      >
        <Box
          position="absolute"
          bottom="20px"
          left="20px"
          bg="white"
          p="20px"
          borderRadius="md"
          boxShadow="md"
          maxWidth="300px"
        >
          <Heading as="h1" size="xl" mb={2} color="black">
            {club.name}
          </Heading>
          <Box position="relative" padding="3">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              Info
            </AbsoluteCenter>
          </Box>
          <Text fontSize="lg" mb={4} color="black">
            {club.description}
          </Text>
          <Text fontSize="md" color="black">
            {club.address}
          </Text>
        </Box>
      </Box>

      {/* Instructors Section */}
      <Box p={8}>
        <Heading as="h2" size="lg" mb={4}>
          Instructors
        </Heading>
        <Flex flexWrap="wrap" justify="center">
          {club.instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

export default ClubPage;
