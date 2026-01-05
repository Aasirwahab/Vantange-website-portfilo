"use client";
import "./spaces.css";
import { spacesData } from "./spaces.js";
import { useRef, useEffect, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(ScrollTrigger);

const page = () => {
  const spacesRef = useRef(null);
  const scrollTriggerInstances = useRef([]);
  const { navigateWithTransition } = useViewTransition();
  const [currentCategory, setCurrentCategory] = useState("All");

  const filteredSpaces = spacesData.filter((space) => {
    if (currentCategory === "All") return true;
    return space.categories.includes(currentCategory);
  });

  const cleanupScrollTriggers = () => {
    scrollTriggerInstances.current.forEach((instance) => {
      if (instance) instance.kill();
    });
    scrollTriggerInstances.current = [];
  };

  const setupAnimations = () => {
    cleanupScrollTriggers();

    if (!spacesRef.current) return;

    // Small timeout to allow DOM to update
    const ctx = gsap.context(() => {
      const spaces = spacesRef.current.querySelectorAll(".space");
      if (spaces.length === 0) return;

      spaces.forEach((space, index) => {
        gsap.set(space, {
          opacity: 0,
          scale: 0.75,
          y: 150,
        });

        if (index === 0) {
          gsap.to(space, {
            duration: 0.75,
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power3.out",
            delay: 0.2,
          });
        } else {
          const trigger = ScrollTrigger.create({
            trigger: space,
            start: "top 100%",
            onEnter: () => {
              gsap.to(space, {
                duration: 0.75,
                y: 0,
                scale: 1,
                opacity: 1,
                ease: "power3.out",
              });
            },
          });

          scrollTriggerInstances.current.push(trigger);
        }
      });

      ScrollTrigger.refresh();
    }, spacesRef);

    return () => ctx.revert();
  };

  useEffect(() => {
    setupAnimations();

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanupScrollTriggers();
    };
  }, [filteredSpaces]);

  const handleFilter = (category) => {
    if (category === currentCategory) return;
    setCurrentCategory(category);
  };

  return (
    <>
      <Nav />
      <div className="page spaces">
        <section className="spaces-header">
          <div className="container">
            <div className="prop-col"></div>
            <div className="prop-col">
              <Copy delay={1}>
                <h1>Timeless Spaces</h1>
              </Copy>
              <div className="prop-filters">
                <div
                  className={`filter ${currentCategory === "All" ? "active" : ""}`}
                  onClick={() => handleFilter("All")}
                >
                  <Copy delay={1}>
                    <p className="lg">All</p>
                  </Copy>
                </div>
                <div
                  className={`filter ${currentCategory === "Residential" ? "active" : ""
                    }`}
                  onClick={() => handleFilter("Residential")}
                >
                  <Copy delay={1.1}>
                    <p className="lg">Residential</p>
                  </Copy>
                </div>
                <div
                  className={`filter ${currentCategory === "Commercial" ? "active" : ""
                    }`}
                  onClick={() => handleFilter("Commercial")}
                >
                  <Copy delay={1.2}>
                    <p className="lg">Commercial</p>
                  </Copy>
                </div>
                <div
                  className={`filter ${currentCategory === "Hospitality" ? "active" : ""
                    }`}
                  onClick={() => handleFilter("Hospitality")}
                >
                  <Copy delay={1.3}>
                    <p className="lg">Hospitality</p>
                  </Copy>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="spaces-list">
          <div className="container" ref={spacesRef}>
            {filteredSpaces.map((space, index) => (
              <a
                key={space.id}
                href={space.route}
                className="space"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition(space.route);
                }}
              >
                <div className="space-img">
                  <img src={space.image} alt={space.name} />
                </div>
                <div className="space-info">
                  <div className="prop-info-col">
                    <div className="prop-date">
                      <p>{space.date}</p>
                    </div>
                  </div>
                  <div className="prop-info-col">
                    <div className="prop-info-sub-col">
                      <div className="prop-name">
                        <h3>{space.name}</h3>
                        <p className="lg">{space.location}</p>
                      </div>
                    </div>
                    <div className="prop-info-sub-col">
                      <div className="prop-client">
                        <div className="prop-client-img">
                          <img src={space.clientImage} alt={space.clientName} />
                        </div>
                        <div className="prop-client-name">
                          <p>{space.clientName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
