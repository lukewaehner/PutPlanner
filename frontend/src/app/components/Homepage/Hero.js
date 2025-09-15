"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Chip,
  Image,
  Divider,
} from "@nextui-org/react";
import { ArrowRight } from "react-iconly";
import { useRouter } from "next/navigation";
const Hero = () => {
  const Router = useRouter();
  return (
    <div className="flex items-center justify-center gap-10 mb-12 p-6 m-6">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <h1 className="text-[72px] font-semibold  text-center">PutPlanner</h1>
          <Image src="/images/logo.png" width={105} />
        </div>
        <p className="text-xl mb-8 font-medium text-opacity-55 text-gray-700">
          Golf Bookings Made Easy
        </p>
        <div className="flex gap-4">
          <Chip>All Ages</Chip>
          <Chip>All Levels</Chip>
          <Chip>Everywhere</Chip>
        </div>
        <Button
          onClick={() => {
            Router.push("./browse");
          }}
          endContent={<ArrowRight set="light" />}
          className="mt-8 text-lg w-2/3 rounded-full bg-[#2D3748] text-white p-7"
        >
          Book your first lesson now
        </Button>
      </div>
      <div>
        <Image width={400} src="/images/Shiels.jpg" />
      </div>
    </div>
  );
};

export default Hero;
