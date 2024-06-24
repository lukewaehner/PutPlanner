import React from "react";
import Image from "next/image";
import { Box, Heading, Text } from "@chakra-ui/react";

const Splash = () => {
  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Image src="/images/logo.png" alt="Logo" width={200} height={200} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={4}
      >
        <Heading
          as="h1"
          size="2xl"
          mb={4}
          color="white"
          textDecoration="underline"
          textDecorationColor="#94BF54"
        >
          PutPlanner
        </Heading>
        <Text fontSize="2xl" color="white">
          Perfect your game, one lesson at a time.
        </Text>
      </Box>
    </Box>
  );
};

export default Splash;
