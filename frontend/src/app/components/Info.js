import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import VideoBackground from "../components/VideoBackground";

const Info = () => {
  return (
    <Box position="relative" height="100vh" width="100vw" overflow="hidden">
      <VideoBackground />
      <Box
        position="relative"
        zIndex="1"
        color="white"
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        padding="16px"
      >
        <Heading as="h1" size="2xl" mb={4}>
          Info Page
        </Heading>
        <Text fontSize="xl">
          This is the information section. Add your content here.
        </Text>
      </Box>
    </Box>
  );
};

export default Info;
