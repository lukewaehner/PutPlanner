"use client";

import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import VideoBackground from "../components/VideoBackground";

const steps = [
  { title: "First", description: "Search for golf clubs" },
  {
    title: "Second",
    description: "Select a instructor",
  },
  { title: "Third", description: "Sign up for a time slot" },
];

const Info = () => {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Box position="relative" height="100vh" width="100vw" overflow="hidden">
      <VideoBackground />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        backgroundColor="white"
        padding="32px"
        borderRadius="8px"
        boxShadow="lg"
        maxWidth="1000px"
        width="100%"
        textAlign="center"
      >
        <Heading as="h1" size="2xl" mb={4} color="black">
          Info Page
        </Heading>
        <Text fontSize="xl" mb={4} color="black">
          Follow these steps to get started on your PutPlanner journey:
        </Text>

        <Stepper index={activeStep} colorScheme="green">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};

export default Info;
