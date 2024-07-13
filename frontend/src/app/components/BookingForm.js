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
  ModalFooter,
  Text,
  Stack,
  useDisclosure,
  useToast,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useAuth } from "../hooks/AuthContext";

const BookingForm = ({ instructorId }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotDuration, setSlotDuration] = useState(30); // 30 minutes by default
  const { userId } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDurationModalOpen,
    onOpen: onDurationModalOpen,
    onClose: onDurationModalClose,
  } = useDisclosure();
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
    onDurationModalOpen();
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
        userId: userId,
        date: selectedSlot.date,
        startTime: selectedSlot.start,
        endTime: selectedSlot.end,
        duration: slotDuration,
      });
      toast({
        title: "Booking Successful",
        description: "Your booking has been confirmed.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedSlot(null);
      fetchAvailability();
      onClose();
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

  const formatDate = (dateString) => {
    // Extract year, month, and day from the date string
    const [year, month, day] = dateString.split("T")[0].split("-");
    // Create a Date object using UTC
    const date = new Date(Date.UTC(year, month - 1, day));
    // Adjust for the user's timezone offset
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() + userTimezoneOffset);
    // Format the adjusted date
    return format(localDate, "MMMM d, yyyy");
  };

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(":");
    let period = "AM";
    let hours12 = parseInt(hours, 10);

    if (hours12 >= 12) {
      period = "PM";
      if (hours12 > 12) {
        hours12 -= 12;
      }
    }

    if (hours12 === 0) {
      hours12 = 12;
    }

    return `${hours12}:${minutes} ${period}`;
  };

  const generateTimeSlots = (start, end, bookedSlots) => {
    const slots = [];
    let currentTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);

    while (currentTime < endTime) {
      const slotStart24 = currentTime.toTimeString().slice(0, 5);
      let slotEnd = new Date(currentTime.getTime() + 30 * 60000);

      // Ensure slotEnd does not exceed the overall end time
      if (slotEnd > endTime) {
        slotEnd = endTime;
      }

      const slotEnd24 = slotEnd.toTimeString().slice(0, 5);

      // Check if this slot is booked
      const isSlotBooked = bookedSlots.some(
        (bookedSlot) =>
          bookedSlot.isBooked &&
          ((slotStart24 >= bookedSlot.start && slotStart24 < bookedSlot.end) ||
            (slotEnd24 > bookedSlot.start && slotEnd24 <= bookedSlot.end) ||
            (slotStart24 < bookedSlot.start && slotEnd24 > bookedSlot.end))
      );

      slots.push({
        start: slotStart24,
        end: slotEnd24,
        displayStart: convertTo12HourFormat(slotStart24),
        displayEnd: convertTo12HourFormat(slotEnd24),
        isAvailable: !isSlotBooked,
      });

      // Move to the next slot
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return slots;
  };

  const generateHourLongTimeSlots = (start, end, bookedSlots) => {
    const slots = [];
    let currentTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);

    // Round the start time to the nearest top of the hour
    if (currentTime.getMinutes() !== 0 || currentTime.getSeconds() !== 0) {
      currentTime.setHours(currentTime.getHours() + 1);
      currentTime.setMinutes(0);
      currentTime.setSeconds(0);
    }

    while (currentTime < endTime) {
      const slotStart24 = currentTime.toTimeString().slice(0, 5);
      let slotEnd = new Date(currentTime.getTime() + 60 * 60000); // Add 60 minutes
      const slotEnd24 = slotEnd.toTimeString().slice(0, 5);

      // Check if this slot is booked
      const isSlotBooked = bookedSlots.some(
        (bookedSlot) =>
          bookedSlot.isBooked &&
          ((slotStart24 >= bookedSlot.start && slotStart24 < bookedSlot.end) ||
            (slotEnd24 > bookedSlot.start && slotEnd24 <= bookedSlot.end) ||
            (slotStart24 < bookedSlot.start && slotEnd24 > bookedSlot.end))
      );

      // Combine slots if the hour has mixed availability
      const isAvailable =
        bookedSlots.every(
          (bookedSlot) =>
            bookedSlot.start >= slotEnd24 ||
            bookedSlot.end <= slotStart24 ||
            bookedSlot.isBooked
        ) || bookedSlots.length === 0;

      slots.push({
        start: slotStart24,
        end: slotEnd24,
        displayStart: convertTo12HourFormat(slotStart24),
        displayEnd: convertTo12HourFormat(slotEnd24),
        isAvailable: !isSlotBooked,
        isMixedAvailability:
          isAvailable &&
          bookedSlots.some(
            (bookedSlot) =>
              bookedSlot.start < slotEnd24 &&
              bookedSlot.end > slotStart24 &&
              bookedSlot.isBooked
          ),
      });

      // Move to the next hour slot
      currentTime.setHours(currentTime.getHours() + 1);
    }

    return slots;
  };

  const handleDurationSelect = (duration) => {
    setSlotDuration(parseInt(duration, 10));
    onDurationModalClose();
    onOpen();
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
              {formatDate(dateObj.date)}
            </Text>
          </Box>
        ))}
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a Time Slot</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedDate && (
              <Stack spacing={4}>
                <Text fontSize="lg" fontWeight="bold">
                  {formatDate(selectedDate.date)}
                </Text>
                <Stack spacing={2}>
                  {selectedDate.timeSlots.flatMap((slot) => {
                    const timeSlots =
                      slotDuration === 30
                        ? generateTimeSlots(
                            slot.start,
                            slot.end,
                            selectedDate.timeSlots
                          )
                        : generateHourLongTimeSlots(
                            slot.start,
                            slot.end,
                            selectedDate.timeSlots
                          );
                    return timeSlots.map((timeSlot, index) => (
                      <Button
                        key={`${selectedDate.date}-${timeSlot.start}-${timeSlot.end}-${index}`}
                        onClick={() =>
                          timeSlot.isAvailable && handleSlotSelect(timeSlot)
                        }
                        bg={
                          selectedSlot &&
                          selectedSlot.start === timeSlot.start &&
                          selectedSlot.end === timeSlot.end
                            ? "blue.300"
                            : timeSlot.isAvailable
                            ? "blue.500"
                            : "gray.300"
                        }
                        color={timeSlot.isAvailable ? "white" : "gray.500"}
                        _hover={
                          timeSlot.isAvailable
                            ? {
                                bg:
                                  selectedSlot &&
                                  selectedSlot.start === timeSlot.start &&
                                  selectedSlot.end === timeSlot.end
                                    ? "blue.300"
                                    : "blue.600",
                              }
                            : undefined
                        }
                        cursor={
                          timeSlot.isAvailable ? "pointer" : "not-allowed"
                        }
                        opacity={timeSlot.isAvailable ? 1 : 0.6}
                        disabled={!timeSlot.isAvailable}
                        border={
                          selectedSlot &&
                          selectedSlot.start === timeSlot.start &&
                          selectedSlot.end === timeSlot.end
                            ? "2px solid"
                            : "none"
                        }
                        borderColor="gray.300"
                      >
                        {timeSlot.displayStart} - {timeSlot.displayEnd}
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
                      {selectedSlot.displayStart} - {selectedSlot.displayEnd}
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

      <Modal
        isOpen={isDurationModalOpen}
        onClose={onDurationModalClose}
        size="md"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Slot Duration</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="column" spacing={4}>
              <Button
                onClick={() => handleDurationSelect(30)}
                variant="outline"
                _hover={{ bg: "blue.100", color: "blue.600" }} // Change color on hover
                _active={{ bg: "blue.200" }} // Slightly darker background when active
              >
                30 Minutes
              </Button>
              <Button
                onClick={() => handleDurationSelect(60)}
                variant="outline"
                _hover={{ bg: "blue.100", color: "blue.600" }} // Change color on hover
                _active={{ bg: "blue.200" }} // Slightly darker background when active
                mb={3}
              >
                1 Hour
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default BookingForm;
