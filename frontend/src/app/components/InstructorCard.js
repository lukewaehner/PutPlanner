import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Button,
  Text,
  Spacer,
} from "@nextui-org/react";
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
      <Card
        css={{
          maxWidth: "400px",
          minWidth: "350px",
          minHeight: "400px",
          textAlign: "center",
        }}
      >
        <CardBody>
          <Skeleton css={{ height: "20px", width: "50%", mb: "$2" }} />
          <Avatar css={{ size: "$20", mb: "$4" }} />
          <Skeleton css={{ height: "16px", width: "80%", mb: "$2" }} />
          <Skeleton css={{ height: "16px", width: "50%", mb: "$2" }} />
          <Skeleton css={{ height: "16px", width: "80%" }} />
        </CardBody>
      </Card>
    );
  }

  // Render the instructor card with fetched data
  return (
    <Card
      css={{
        maxWidth: "400px",
        minWidth: "350px",
        minHeight: "400px",
        textAlign: "center",
      }}
    >
      <CardBody>
        <CardHeader>
          <Text h3>{name || "Unknown Name"}</Text>
        </CardHeader>
        <Avatar
          size="xl"
          name={name || "Unknown"}
          src={picture}
          css={{ mb: "$4", borderColor: "$gray500", borderWidth: "2px" }}
        />
        <Text small css={{ mb: "$2" }}>
          Rating: {rating || "Unknown Rating"}
        </Text>
        <Text small>{bio || "No bio available"}</Text>
        <Spacer y={1.5} />
        <Button onClick={handleBooking}>Book with me!</Button>
      </CardBody>
    </Card>
  );
}

export default InstructorCard;
