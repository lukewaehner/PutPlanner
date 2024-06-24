import React from "react";

import {
  Box,
  Text,
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Heading,
  Divider,
  List,
  ListItem,
  ListIcon,
  Link,
} from "@chakra-ui/react";

import { InfoIcon, CalendarIcon } from "@chakra-ui/icons";

function ClubCard({ club, isLoading }) {
  return (
    <Box
      bg="white"
      borderRadius="8px"
      width="25vw"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
      padding="16px"
      marginBottom="8px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      border="2px solid #f0f0f0"
      maxHeight="27.6vh"
      height={isLoading ? "27.6vh" : "auto"}
    >
      {isLoading ? (
        <>
          <SkeletonCircle size="20" marginBottom="20px" />
          <SkeletonText width="80%" />
        </>
      ) : (
        <>
          {club.image && (
            <Image
              src={club.image}
              alt={club.name}
              marginBottom="4px"
              borderRadius="8px"
              boxSize="225px"
            />
          )}
          <Heading size="md" margin="4px 0">
            {club.name}
          </Heading>
          <Divider />
          <List spacing={1}>
            <ListItem>
              <ListIcon as={InfoIcon} color="blue.500" boxSize={5} />
              {club.address}
            </ListItem>
            <ListItem>
              <Link href={`/club/${club._id}`}>
                <ListIcon as={CalendarIcon} color="green.500" boxSize={5} />
                {club.instructors.length} instructor
                {club.instructors.length !== 1 ? "s" : ""} available for lessons
              </Link>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );
}

export default ClubCard;
