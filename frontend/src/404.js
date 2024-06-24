import { Box, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

function Custom404() {
  return (
    <Box textAlign="center" mt={10}>
      <Text fontSize="4xl" mb={4}>
        404 - Page Not Found
      </Text>
      <Text fontSize="lg" mb={6}>
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </Text>
      <Button colorScheme="teal" size="lg" as={Link} href="/">
        Go to Home
      </Button>
    </Box>
  );
}

export default Custom404;
