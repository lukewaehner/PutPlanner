"use client";

import { React, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
  useColorModeValue,
  Link,
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../hooks/AuthContext";

import NextLink from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const bgColor = "gray.50";
  const textColor = "gray.600";

  const handleLogin = async (email, password, setError) => {
    try {
      const res = await axios.post("http://localhost:5001/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      const userRes = await axios.get("http://localhost:5001/users/me", {
        headers: { "x-auth-token": res.data.token },
      });

      login(userRes.data._id, userRes.data.name);

      console.log("Login successful:", userRes.data.name);
      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse, setError) => {
    try {
      const res = await axios.post("http://localhost:5001/users/auth/google", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);

      const userRes = await axios.get("http://localhost:5001/users/me", {
        headers: { "x-auth-token": res.data.token },
      });

      login(userRes.data._id, userRes.data.name);

      console.log("Google login successful:", userRes.data.name);
      router.push("/");
    } catch (error) {
      console.error("Error logging in with Google:", error);
      setError(error.message);
    }
  };

  return (
    <Flex minHeight="100vh" width="full">
      {/* Left side - Info */}
      <VStack
        w="50%"
        h="100vh"
        p={10}
        spacing={10}
        align="flex-start"
        bg="green.700"
        justifyContent="space-between"
      >
        {/* Top Section */}
        <HStack spacing={4} align="center">
          <Image src="/images/logo.png" alt="Logo" maxWidth="50px" />
          <Heading size="lg" color="white">
            PutPlanner
          </Heading>
        </HStack>

        {/* Middle Section */}
        <VStack spacing={3} align="center" alignSelf="center">
          <Heading size="2xl" color="white">
            Welcome Back
          </Heading>
          <Text fontSize="xl" color="gray.50">
            Book your next adventure with ease
          </Text>
          {/* Avatars Section */}
          <AvatarGroup spacing="1.5rem" size="lg">
            <Avatar
              name="User 1"
              src="https://i.redd.it/hqfqcp09ik281.jpg"
              size="lg"
              position="relative"
              zIndex="2"
            />
            <Avatar
              name="User 2"
              src="https://i.redd.it/hqfqcp09ik281.jpg"
              size="lg"
              position="relative"
              zIndex="1"
              ml="-8"
            />
            <Avatar
              name="User 3"
              src="https://i.redd.it/hqfqcp09ik281.jpg"
              size="lg"
              position="relative"
              zIndex="0"
              ml="-8"
            />
          </AvatarGroup>
          <Text fontSize="sm" color="gray.200" alignSelf="center" zIndex="1">
            Book with over 10,000+ professionals
          </Text>
        </VStack>

        {/* Bottom Section */}
        <Text fontSize="sm" color="gray.200" alignSelf="center">
          @2024 All rights reserved PutPlanner
        </Text>
      </VStack>

      {/* Right side - Login Form */}
      <VStack
        w="50%"
        h="100vh"
        p={10}
        spacing={10}
        align="center"
        justifyContent="center"
      >
        <VStack spacing={3} align="flex-start" w="full" maxW="400px">
          <Heading size="xl">Log in to your account</Heading>
          <HStack>
            <Text fontSize="lg" color={textColor}>
              Don't have an account?{" "}
            </Text>
            <Link as={NextLink} href="/register">
              <Button variant="link" colorScheme="green">
                Sign Up
              </Button>
            </Link>
          </HStack>
        </VStack>
        <FormControl maxW="400px">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl maxW="400px">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="green"
          size="lg"
          w="full"
          maxW="400px"
          onClick={handleLogin}
        >
          Sign In
        </Button>
        <Text textAlign="center" my={2}>
          Or
        </Text>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={(error) =>
            console.error("Error logging in with Google:", error)
          }
        />
      </VStack>
    </Flex>
  );
};

export default LoginPage;
