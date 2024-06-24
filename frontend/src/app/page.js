"use client";

import React, { useState, useEffect, useRef } from "react";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import Info from "./components/Info";

function App() {
  const [activeSection, setActiveSection] = useState("splash");
  const sectionRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const currentSectionRefs = sectionRefs.current;
    currentSectionRefs.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      currentSectionRefs.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="App no-scrollbar">
      <Navbar activeSection={activeSection} />
      <div className="sections-container">
        <section
          id="splash"
          className={`section ${activeSection === "splash" ? "active" : ""}`}
          ref={(el) => (sectionRefs.current[0] = el)}
        >
          <Splash />
        </section>
        <section
          id="info"
          className={`section ${activeSection === "info" ? "active" : ""}`}
          ref={(el) => (sectionRefs.current[1] = el)}
        >
          <Info />
        </section>
        <section
          id="map"
          className={`section ${activeSection === "map" ? "active" : ""}`}
          ref={(el) => (sectionRefs.current[2] = el)}
        >
          <Map />
        </section>
      </div>
    </div>
  );
}

export default App;
