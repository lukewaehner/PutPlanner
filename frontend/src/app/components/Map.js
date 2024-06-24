"use client";

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import {
  InfoWindowContent,
  InfoWindowTitle,
  InfoWindowText,
  SearchInput,
  MapContainer,
} from "./MapSubComponents/MapStyles";
import ClubSidebar from "./MapSubComponents/ClubSidebar";

const containerStyle = {
  width: "60vw",
  height: "85vh",
  border: "2px solid #f0f0f0",
};

const initialCenter = {
  lat: 40.73061,
  lng: -73.935242,
};

function Map() {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [markers, setMarkers] = useState([]);
  const [visibleClubs, setVisibleClubs] = useState([]);
  const [mapZoom, setMapZoom] = useState(10);
  const [markerOpacity, setMarkerOpacity] = useState({});
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState(initialCenter);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await fetch("http://localhost:5001/clubs");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setClubs(data);

      const clubMarkers = data.map(
        (club) =>
          new window.google.maps.Marker({
            position: {
              lat: club.location.coordinates[1],
              lng: club.location.coordinates[0],
            },
            clubId: club._id, // Assuming _id is a unique identifier for the club
            map: null, // Initially not added to the map
          })
      );

      setMarkers(clubMarkers);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  const handleMarkerClick = (club) => {
    setSelectedClub(club);
  };

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (map) {
      const boundsChangedListener = window.google.maps.event.addListener(
        map,
        "bounds_changed",
        function () {
          const visible = [];
          for (let i = 0; i < markers.length; i++) {
            if (map.getBounds().contains(markers[i].getPosition())) {
              visible.push(clubs[i]);
            }
          }
          setVisibleClubs(visible);
        }
      );

      return () => {
        window.google.maps.event.removeListener(boundsChangedListener);
      };
    }
  }, [map, markers, clubs]);

  useEffect(() => {
    const filtered = clubs.filter((club) =>
      club.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const newMarkerOpacity = clubs.reduce((acc, club) => {
      acc[club._id] = filtered.includes(club) ? 1 : 0.5;
      return acc;
    }, {});

    setMarkerOpacity(newMarkerOpacity);
    console.log("Marker Opacity Updated:", newMarkerOpacity);
  }, [clubs, searchTerm]);

  return (
    <div className="pt-32">
      <div className="p-5 flex items-start justify-start gap-2">
        <div className="">
          {/* Pass setMapCenter to ClubSidebar */}
          <ClubSidebar
            visibleClubs={visibleClubs}
            setSelectedClub={setSelectedClub}
            setMapCenter={setMapCenter}
          />
        </div>

        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        >
          <MapContainer>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter} // Use mapCenter as the center of the map
              zoom={mapZoom}
              onLoad={(map) => {
                setMap(map);
                const newMarkers = clubs.map(
                  (club) =>
                    new window.google.maps.Marker({
                      position: {
                        lat: club.location.coordinates[1],
                        lng: club.location.coordinates[0],
                      },
                      map,
                    })
                );
                setMarkers(newMarkers);
              }}
            >
              {clubs.map((club) => (
                <Marker
                  key={club._id}
                  position={{
                    lat: club.location.coordinates[1],
                    lng: club.location.coordinates[0],
                  }}
                  onClick={() => handleMarkerClick(club)}
                  options={{ opacity: markerOpacity[club._id] || 1 }}
                />
              ))}

              {selectedClub && (
                <InfoWindow
                  position={{
                    lat: selectedClub.location.coordinates[1],
                    lng: selectedClub.location.coordinates[0],
                  }}
                  onCloseClick={() => setSelectedClub(null)}
                  options={{
                    pixelOffset: new window.google.maps.Size(0, -30),
                    maxWidth: 300,
                    boxStyle: {
                      padding: "10px",
                      boxShadow: "0 2px 7px 1px rgba(0,0,0,0.3)",
                      borderRadius: "5px",
                    },
                  }}
                >
                  {/* Info Window Content */}
                  <InfoWindowContent>
                    <InfoWindowTitle>{selectedClub.name}</InfoWindowTitle>
                    <InfoWindowText>{selectedClub.address}</InfoWindowText>
                    <InfoWindowText>{selectedClub.description}</InfoWindowText>
                  </InfoWindowContent>
                </InfoWindow>
              )}
            </GoogleMap>
          </MapContainer>
        </LoadScript>
      </div>
    </div>
  );
}

export default Map;
