"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ClubCard from "./ClubCard";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const [clubs, setClubs] = useState([]);
  const [visibleClubs, setVisibleClubs] = useState([]);
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
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

    fetchClubs();
  }, []);

  useEffect(() => {
    if (mapContainer.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-73.968285, 40.785091], // Central Park coordinates
        zoom: 14, // closer zoom level for Central Park
      });

      mapRef.current.on("load", () => {
        console.log("Map loaded");

        clubs.forEach((club) => {
          if (
            club.location.coordinates &&
            Array.isArray(club.location.coordinates) &&
            club.location.coordinates.length === 2
          ) {
            try {
              console.log(
                `Adding marker for ${club.name} at ${club.location.coordinates}`
              );
              new mapboxgl.Marker()
                .setLngLat(club.location.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(club.name))
                .addTo(mapRef.current);
            } catch (error) {
              console.error(`Error adding marker for ${club.name}:`, error);
            }
          } else {
            console.error(`Invalid coordinates for club: ${club.name}`);
          }
        });

        mapRef.current.on("moveend", () => {
          updateVisibleClubs();
        });

        updateVisibleClubs();
      });
    }

    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [clubs]);

  const updateVisibleClubs = () => {
    if (!mapRef.current) return;

    const bounds = mapRef.current.getBounds();

    const visible = clubs.filter((club) => {
      const [lng, lat] = club.location.coordinates;
      return (
        bounds.getWest() <= lng &&
        lng <= bounds.getEast() &&
        bounds.getSouth() <= lat &&
        lat <= bounds.getNorth()
      );
    });

    setVisibleClubs(visible);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 40px)",
        width: "calc(100vw - 40px)",
        backgroundColor: "#FAFAFA",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          overflowY: "scroll",
          backgroundColor: "white",
          borderRadius: "8px",
          width: "60%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          {visibleClubs.map((club) => (
            <ClubCard key={club._id} club={club} />
          ))}
        </div>
      </div>
      <div
        ref={mapContainer}
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          width: "40%",
          height: "100%",
          border: "1px solid black",
          padding: 0,
        }}
      />
    </div>
  );
};

export default Map;
