"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Divider,
  AbsoluteCenter,
  IconButton,
  Skeleton,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ArrowBackIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/AuthContext";

import InstructorCard from "../../components/InstructorCard";

function ClubPage() {
  const [club, setClub] = useState(null);
  const Router = useRouter();

  const { userName } = useAuth();

  const handleSettings = () => {
    Router.push("/settings");
  };

  const handleDashboard = () => {
    Router.push("/dashboard");
  };

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/clubs/${clubID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched club data:", data); // Log club data
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

  const handleGoBack = () => {
    Router.push("/"); // Navigate to the previous page
  };

  if (!club) {
    return (
      <Box>
        {/* Loading UI */}
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Go back"
          onClick={handleGoBack}
          position="absolute"
          top="20px"
          left="20px"
          zIndex="1"
          colorScheme="gray"
        />
        <Box
          style={{
            backgroundImage: `url(${club?.image || ""})`,
          }}
          bgColor="gray.200" // Fallback color
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          height="42vh"
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
            height="200px"
            width="350px"
          >
            <Skeleton height="30px" mb="10px" />
            <Skeleton height="20px" mb="10px" />
            <Skeleton height="20px" mb="10px" />
            <Skeleton height="20px" width="50%" />
          </Box>
        </Box>

        {/* Skeleton for Instructors Section */}
        <Box p={8}>
          <Skeleton height="30px" width="8%" mb={4} />
          <Flex flexWrap="wrap" justify="center">
            {[1, 2, 3].map((index) => (
              <InstructorCard key={index} instructor={index} />
            ))}
          </Flex>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {/* Back Button */}
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Go back"
        onClick={handleGoBack}
        position="absolute"
        top="20px"
        left="20px"
        zIndex="1"
        colorScheme="gray"
      />

      {/* Menu */}
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          aria-label="User menu"
          icon={<ChevronDownIcon />}
          mr={4}
          position="absolute"
          top="20px"
          right="20px"
          zIndex="1"
          colorScheme="gray"
        >
          Welcome, {userName}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleSettings}>Settings</MenuItem>
          <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
        </MenuList>
      </Menu>

      {/* Club Info Section */}
      <Box
        style={{
          backgroundImage: `url(${club.image})`,
        }}
        bgColor="gray.200" // Fallback color
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        height="42vh"
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
          maxHeight="200px"
          maxWidth="400px"
          overflow="hidden"
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
            <InstructorCard key={instructor._id} instructor={instructor} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

export default ClubPage;
