"use client";
import React from "react";

const Strip = () => {
  const states = 12;
  const clubs = [
    "Club Logo 1",
    "Club Logo 2",
    "Club Logo 3",
    "Club Logo 4",
    "Club Logo 5",
    "Club Logo 6",
    "Club Logo 7",
    "Club Logo 8",
    "Club Logo 9",
    "Club Logo 10",
  ];

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = "/images/fallback.jpg";
  };

  return (
    <div className="h-[20vh] bg-[#EDF2F7] flex items-center justify-center gap-6 p-4 overflow-y-hidden">
      <h1 className="text-3xl font-semibold text-center">
        Proudly used in over <br />
        {states} states
      </h1>
      <div className="grid grid-rows-2 grid-cols-5 gap-4">
        {clubs.map((club, index) => (
          <div key={index} className="flex items-center justify-center">
            <img
              src={`/images/${club.replace(/ /g, "%20")}.png`}
              alt={club}
              className="h-16 w-16 rounded-lg opacity-45"
              onError={handleError}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Strip;
