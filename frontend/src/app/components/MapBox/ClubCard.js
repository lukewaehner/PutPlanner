import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { InfoCircle, Calendar } from "react-iconly";

const ClubCard = ({ club }) => {
  return (
    <Card className="mb-6 shadow-lg text-center border-2">
      {club.image && (
        <CardHeader className="p-0 pt-2 flex justify-center items-center">
          <Image
            src={club.image}
            alt={club.name}
            width={360}
            className="rounded-t-lg object-cover"
          />
        </CardHeader>
      )}
      <CardBody className="p-4 flex justify-center items-center">
        <h4 className="text-lg font-semibold mb-2">{club.name}</h4>
        <p className="text-md text-gray-500 mb-2">{club.address}</p>
        <Divider className="my-4" />
        <div style={{ marginTop: "8px" }}>
          <div className="flex justify-center items-center gap-3 mt-3 mb-2">
            <InfoCircle set="curved" primaryColor="blue" />
            <p>{club.address}</p>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Calendar set="curved" primaryColor="green" />
            {club.instructors.length > 0 ? (
              <Link
                href={`/club/${club._id}`}
                className="text-blue-500 hover:underline"
              >
                <p>
                  {club.instructors.length} instructor
                  {club.instructors.length !== 1 ? "s" : ""} available for
                  lessons
                </p>
              </Link>
            ) : (
              <p className="text-gray-500 cursor-not-allowed">
                {club.instructors.length} instructor
                {club.instructors.length !== 1 ? "s" : ""} available for lessons
              </p>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ClubCard;
