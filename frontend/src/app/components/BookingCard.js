// "use client";
import React, { useEffect } from "react";
import { Box, Heading, Text, Flex, Avatar, Button } from "@chakra-ui/react";

const BookingCard = ({ booking }) => {
  // Destructure booking properties
  const { date, instructor, createdAt, startTime } = booking;
  const { name, bio, picture, rating } = instructor;

  useEffect(() => {
    console.log(date);
  }, [date]);

  const combineDateAndTime = (dateString, timeString) => {
    const date = new Date(dateString);
    const [hours, minutes] = timeString.split(":").map(Number);
    date.setUTCHours(hours, minutes, 0, 0);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() + userTimezoneOffset);
    return localDate;
  };

  const formatDateTime = (date) => {
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Combine date and startTime
  const combinedDateTime = combineDateAndTime(date, startTime);

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
          Date: {formatDateTime(combinedDateTime)}
        </Text>
        <Text fontSize="sm" mb={2}>
          Booked At: {formatDateTime(new Date(createdAt))}
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
