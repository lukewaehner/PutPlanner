"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Heading,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/AuthContext";

const BookingForm = ({ instructorId }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { userId } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    if (instructorId) {
      fetchAvailability();
    }
  }, [instructorId]);

  const fetchAvailability = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/instructors/${instructorId}/availability`
      );
      setAvailableDates(response.data);
    } catch (error) {
      console.error("Error fetching availability:", error);
      toast({
        title: "Failed to fetch availability",
        description:
          "There was an error fetching availability. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onOpen();
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot({ ...slot, date: selectedDate.date });
  };

  const handleSubmit = async () => {
    if (!selectedSlot) {
      toast({
        title: "No Slot Selected",
        description: "Please select a time slot.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      await axios.post(`http://localhost:5001/bookings`, {
        instructorId: instructorId,
        userId: userId, // Replace with actual user ID
        date: selectedSlot.date,
        startTime: selectedSlot.start,
        endTime: selectedSlot.end,
      });
      toast({
        title: "Booking Successful",
        description: "Your booking has been confirmed.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedSlot(null);
      fetchAvailability(); // Refresh availability after booking
      onClose(); // Close the modal after booking
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: `There was an error booking the slot: ${
          error.response?.data || error.message
        }`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const generateTimeSlots = (start, end) => {
    const slots = [];
    let currentTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);

    while (currentTime < endTime) {
      const slotStart = currentTime.toTimeString().slice(0, 5);
      currentTime.setMinutes(currentTime.getMinutes() + 30);
      const slotEnd = currentTime.toTimeString().slice(0, 5);
      slots.push({ start: slotStart, end: slotEnd });
    }

    return slots;
  };

  return (
    <Container maxW="container.md" mt={8}>
      <Heading mb={6}>Available Dates and Time Slots</Heading>
      <Stack spacing={4}>
        {availableDates.map((dateObj) => (
          <Box
            key={dateObj.date}
            p={4}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: "gray.100" }}
            onClick={() => handleDateSelect(dateObj)}
          >
            <Text fontSize="lg" fontWeight="bold">
              {new Date(dateObj.date).toDateString()}
            </Text>
          </Box>
        ))}
      </Stack>

      {/* Modal for selecting a time slot */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a Time Slot</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedDate && (
              <Stack spacing={4}>
                <Text fontSize="lg" fontWeight="bold">
                  {new Date(selectedDate.date).toDateString()}
                </Text>
                <Stack spacing={2}>
                  {selectedDate.timeSlots.map((slot) => {
                    // Split the time slots
                    const timeSlots = generateTimeSlots(slot.start, slot.end);
                    return timeSlots.map((timeSlot, index) => (
                      <Button
                        key={`${selectedDate.date}-${timeSlot.start}-${timeSlot.end}`}
                        onClick={() => handleSlotSelect(timeSlot)}
                        isDisabled={slot.isBooked}
                        bg={slot.isBooked ? "gray.200" : "blue.500"}
                        color="white"
                        _hover={{ bg: slot.isBooked ? "gray.300" : "blue.600" }}
                      >
                        {timeSlot.start} - {timeSlot.end}
                      </Button>
                    ));
                  })}
                </Stack>
                {selectedSlot && (
                  <Box mt={4}>
                    <Text mb={2} fontSize="lg" fontWeight="bold">
                      Selected Slot
                    </Text>
                    <Text>
                      {new Date(selectedSlot.date).toDateString()}{" "}
                      {selectedSlot.start} - {selectedSlot.end}
                    </Text>
                    <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
                      Book This Slot
                    </Button>
                  </Box>
                )}
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default BookingForm;
