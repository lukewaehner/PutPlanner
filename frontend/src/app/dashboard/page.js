"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/AuthContext";
import BookingCard from "../components/BookingCard";

const Dashboard = () => {
  const { userId, userName } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        console.log("Fetching bookings for user:", userId);
        const response = await axios.get(
          `http://localhost:5001/bookings/user/${userId}`
        );
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  if (!userId) {
    return <div>Please log in to view this page.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userName}</h1>
      <h2>My Bookings</h2>
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
};

export default Dashboard;
