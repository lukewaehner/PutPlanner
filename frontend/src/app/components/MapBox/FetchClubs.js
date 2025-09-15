"use client";

import React, { useEffect, useState } from "react";

const FetchClubs = () => {
  const [clubs, setClubs] = useState([]);

  const fetchClubs = async () => {
    try {
      const response = await fetch("http://localhost:5001/clubs");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  useEffect(() => {
    console.log("Clubs:", clubs);
  }, [clubs]);

  return (
    <div>
      <h1>Fetched Clubs</h1>
      <pre>{JSON.stringify(clubs, null, 2)}</pre>
    </div>
  );
};

export default FetchClubs;
