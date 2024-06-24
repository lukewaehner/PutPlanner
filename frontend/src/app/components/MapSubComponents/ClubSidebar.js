import React from "react";
import ClubCard from "./ClubCard";

const ClubSidebar = ({ visibleClubs, setSelectedClub, setMapCenter }) => {
  const handleClubClick = (club) => {
    setSelectedClub(club);
    setMapCenter({
      lat: club.location.coordinates[1],
      lng: club.location.coordinates[0],
    });
  };

  const renderCards = () => {
    const cards = visibleClubs.map((club) => (
      <li key={club._id} onClick={() => handleClubClick(club)}>
        <ClubCard club={club} />
      </li>
    ));

    // Fill with skeletons if less than 3 clubs
    if (cards.length < 3) {
      const skeletons = Array(3 - cards.length)
        .fill(null)
        .map((_, index) => (
          <li key={`loader-${index}`}>
            <ClubCard isLoading={true} />
          </li>
        ));
      cards.push(...skeletons);
    }

    return cards;
  };

  return (
    <ul className="list-none p-0 m-0 h-[85vh] overflow-y-auto no-scrollbar">
      {renderCards()}
    </ul>
  );
};

export default ClubSidebar;
