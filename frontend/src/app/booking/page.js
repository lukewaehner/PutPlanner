"use client";

import { useSearchParams } from "next/navigation";
import BookingForm from "../components/BookingForm";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const instructorId = searchParams.get("instructorId");

  return (
    <div>
      <h1>Book a Session</h1>
      {instructorId ? (
        <BookingForm instructorId={instructorId} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
