"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function ClubPage() {
  const pathname = usePathname();
  const clubID = pathname.split("/").pop();

  const [club, setClub] = useState(null);

  useEffect(() => {
    if (clubID) {
      // Fetch club data using clubID
      fetch(`http://localhost:5001/clubs/${clubID}`)
        .then((response) => response.json())
        .then((data) => setClub(data))
        .catch((error) => console.error("Error fetching club:", error));
    }
  }, [clubID]);

  if (!club) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{club.name}</h1>
      <p>{club.description}</p>
      <p>{club.address}</p>
      {/* Display other club information */}
    </div>
  );
}

export default ClubPage;
