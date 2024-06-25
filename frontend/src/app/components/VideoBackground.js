import React from "react";
import { Box } from "@chakra-ui/react";

const VideoBackground = () => {
  return (
    <Box
      as="video"
      autoPlay
      loop
      muted
      position="absolute"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      objectFit="cover"
    >
      <source src="/aerial-golf-course.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </Box>
  );
};

export default VideoBackground;
