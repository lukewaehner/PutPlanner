import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Avatar,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

function InstructorCard({ instructor }) {
  // Destructure instructor data directly from props
  const { name, rating, bio, picture } = instructor;
  const router = useRouter();

  const handleBooking = () => {
    router.push(`/booking?instructorId=${instructor._id}`);
  };

  // Skeleton loader for the card
  if (!name && !rating && !bio && !picture) {
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
          <Skeleton height="20px" width="50%" mb={2} />
          <Avatar size="xl" mb={4} />
          <Skeleton height="16px" width="80%" mb={2} />
        </Flex>
        <Skeleton height="16px" width="50%" mb={2} />
        <Skeleton height="16px" width="80%" />
      </Box>
    );
  }

  // Render the instructor card with fetched data
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
          {name || "Unknown Name"}
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
      </Flex>
      <Text fontSize="sm">{bio || "No bio available"}</Text>
      <Button my={6} onClick={handleBooking}>
        Book with me!
      </Button>
    </Box>
  );
}

export default InstructorCard;
