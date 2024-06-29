import React from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/AuthContext";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Navbar = ({ activeSection }) => {
  const { userName } = useAuth();

  const Router = useRouter();

  const handleSettings = () => {
    Router.push("/settings");
  };

  const handleDashboard = () => {
    Router.push("/dashboard");
  };

  return (
    <Box
      as="nav"
      className="fixed m-1 top-0 left-0 right-0 bg-white shadow-md z-50 rounded-lg"
    >
      <Flex justify="space-between" align="center" p="4">
        <Box>
          <Image src="/images/logo.png" alt="Logo" maxHeight="50px" />
        </Box>
        <Flex as="ul" listStyleType="none" justify="center" flex="1">
          <li>
            <Link
              href="#splash"
              fontWeight={activeSection === "splash" ? "bold" : "normal"}
              _hover={{ textDecoration: "underline" }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#info"
              fontWeight={activeSection === "info" ? "bold" : "normal"}
              _hover={{ textDecoration: "underline" }}
              ml="4"
            >
              Info
            </Link>
          </li>
          <li>
            <Link
              href="#map"
              fontWeight={activeSection === "map" ? "bold" : "normal"}
              _hover={{ textDecoration: "underline" }}
              ml="4"
            >
              Map
            </Link>
          </li>
        </Flex>
        <Flex alignItems="center">
          {userName ? (
            <>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  mr={4}
                  cursor="pointer"
                >
                  Welcome, {userName}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleSettings}>Settings</MenuItem>
                  <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                </MenuList>
              </Menu>
              <Button variant="outline">Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" mr="2">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
