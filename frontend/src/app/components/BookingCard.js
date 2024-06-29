import React from "react";
import { Box, Heading, Text, Flex, Avatar, Button } from "@chakra-ui/react";

const BookingCard = ({ booking }) => {
  // Destructure booking properties
  const { date, instructor, createdAt } = booking;
  const { name, bio, picture, rating } = instructor;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={2}
      maxWidth="400px"
      minWidth="350px"
      minHeight="400px"
      textAlign="center"
    >
      <Flex direction="column" align="center" mb={4}>
        <Heading as="h3" size="md" mb={2}>
          Booking with {name || "Unknown Name"}
        </Heading>
        <Avatar
          size="xl"
          name={name || "Unknown"}
          src={picture}
          mb={4}
          borderColor="gray.500"
          borderWidth="2px"
        />
        <Text fontSize="sm" mb={2}>
          Rating: {rating || "Unknown Rating"}
        </Text>
        <Text fontSize="sm" mb={2}>
          Date: {new Date(date).toLocaleString()}
        </Text>
        <Text fontSize="sm" mb={2}>
          Booked At: {new Date(createdAt).toLocaleString()}
        </Text>
      </Flex>
      <Button
        my={6}
        onClick={() => {
          console.log(booking._id); // Example action
        }}
      >
        View Booking Details
      </Button>
    </Box>
  );
};

export default BookingCard;
