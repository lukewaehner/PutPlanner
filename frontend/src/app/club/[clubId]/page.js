"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Grid,
  Image,
  Link,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/AuthContext";
import InstructorCard from "../../components/InstructorCard";
import { FaArrowLeft } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

function ClubPage() {
  const [club, setClub] = useState(null);
  const Router = useRouter();
  const { userName } = useAuth();

  const handleSettings = () => {
    Router.push("/settings");
  };

  const handleDashboard = () => {
    Router.push("/dashboard");
  };

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/clubs/${clubID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched club data:", data); // Log club data
        setClub(data);
      } catch (error) {
        console.error("Error fetching club:", error);
      }
    };

    // Replace clubID with actual logic to extract ID from pathname
    const pathname = window.location.pathname;
    const clubID = pathname.split("/").pop();

    if (clubID) {
      fetchClubData();
    }
  }, []);

  const handleGoBack = () => {
    Router.push("/"); // Navigate to the previous page
  };

  if (!club) {
    return (
      <div>
        {/* Loading UI */}
        <Button
          auto
          icon={<FaArrowLeft />}
          onClick={handleGoBack}
          css={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}
        />
        <Card
          cover
          css={{
            height: "42vh",
            backgroundImage: `url(${club?.image || ""})`,
            bgColor: "gray.200", // Fallback color
            bgSize: "cover",
            bgPosition: "center",
            bgRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <Card.Body css={{ position: "absolute", bottom: 20, left: 20 }}>
            <Skeleton height="30px" mb="10px" />
            <Skeleton height="20px" mb="10px" />
            <Skeleton height="20px" mb="10px" />
            <Skeleton height="20px" width="50%" />
          </Card.Body>
        </Card>

        {/* Skeleton for Instructors Section */}
        <div style={{ padding: "32px" }}>
          <Skeleton height="30px" width="8%" mb="16px" />
          <Grid.Container gap={2} justify="center">
            {[1, 2, 3].map((index) => (
              <InstructorCard key={index} instructor={index} />
            ))}
          </Grid.Container>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Back Button */}
      <Button
        auto
        icon={<FaArrowLeft />}
        onClick={handleGoBack}
        css={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}
      />

      {/* User Menu */}
      <Button
        auto
        iconRight={<FaChevronDown />}
        css={{ position: "absolute", top: 20, right: 20, zIndex: 1 }}
        onClick={handleDashboard}
      >
        Welcome, {userName}
      </Button>

      {/* Club Info Section */}
      <Card
        cover
        css={{
          height: "42vh",
          backgroundImage: `url(${club.image})`,
          bgColor: "gray.200", // Fallback color
          bgSize: "cover",
          bgPosition: "center",
          bgRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <Card.Body css={{ position: "absolute", bottom: 20, left: 20 }}>
          <Text h1 size={30} weight="bold" color="white">
            {club.name}
          </Text>
          <Spacer y={0.5} />
          <Divider />
          <Spacer y={0.5} />
          <Text size={18} color="white">
            {club.description}
          </Text>
          <Text size={16} color="white">
            {club.address}
          </Text>
        </Card.Body>
      </Card>

      {/* Instructors Section */}
      <div style={{ padding: "32px" }}>
        <Text h2 size={24} weight="bold">
          Instructors
        </Text>
        <Spacer y={1} />
        <Grid.Container gap={2} justify="center">
          {club.instructors.map((instructor) => (
            <InstructorCard key={instructor._id} instructor={instructor} />
          ))}
        </Grid.Container>
      </div>
    </div>
  );
}

export default ClubPage;
