"use client";

import { useSearchParams } from "next/navigation";
import { Image } from "@chakra-ui/react";
import BookingForm from "../components/BookingForm";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const instructorId = searchParams.get("instructorId");

  return (
    <div>
      <div className="m-5">
        <a href="/">
          <Image src="/images/logo.png" alt="Logo" width="auto" height="50" />
        </a>
      </div>
      {instructorId ? (
        <BookingForm instructorId={instructorId} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
