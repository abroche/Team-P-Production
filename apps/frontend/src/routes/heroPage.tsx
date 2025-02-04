import mapImg from "../assets/00_thelowerlevel1.png";
import heroImage from "../assets/heroImage.png";
import React, { useState, useEffect } from "react";
// import { Dialog } from "@mui/material";
//import LoginDialog from "../components/loginDialog.tsx";
import { useAuth0 } from "@auth0/auth0-react";

function HeroPage() {
  // Import login from Auth0
  const { loginWithRedirect } = useAuth0();

  // Use state for whether login dialog is visible or not
  //const [dialogOpen, setDialogOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  // Open login dialog
  async function setLoginOpen() {
    await loginWithRedirect({
      appState: {
        returnTo: "map",
      },
    });
  }

  // Close login dialog
  // function setLoginClose() {
  //   setDialogOpen(false);
  // }

  useEffect(() => {
    // Show title after a delay
    const titleTimeout = setTimeout(() => {
      setShowTitle(true);
    }, 1000);

    // Show subtitle after a delay
    const subtitleTimeout = setTimeout(() => {
      setShowSubtitle(true);
    }, 2000);

    // Clean up the timeouts
    return () => {
      clearTimeout(titleTimeout);
      clearTimeout(subtitleTimeout);
    };
  }, []);

  return (
    <div
      className="flex
      flex-row
      h-full
      w-screen
      bg-primary"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
        animationName: "parallaxSlide",
        animationDuration: "70s",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
      }}
    >
      <div className="flex flex-col w-2/3">
        <div className="flex flex-col text-left h-full justify-center px-8">
          <h3
            className={`my-3 text-background font-serif text-5xl ${
              showTitle ? "opacity-100 animate-fadeInLeft" : "opacity-0"
            } transition-opacity 
              duration-1000 transform hover:translate-x-2 
              transition-transform ease-in-out duration-300`}
          >
            Brigham and Women's Hospital
          </h3>
          <h1 className="m-0 text-background font-header text-5xl mb-8 hover:translate-x-2 transition-transform duration-300">
            <span
              className={`inline-block bg-white text-4xl mb-2 ${
                showSubtitle ? "opacity-100 animate-fadeInLeft" : "opacity-0"
              } transition-opacity duration-1000`}
              style={{ fontSize: "35px", margin: "0" }}
            >
              Transforming Medicine through
            </span>
            <br />
            <span
              className={`inline-block bg-white text-4xl ${
                showSubtitle
                  ? "opacity-100 animate-fadeInLeft animate-delay-500"
                  : "opacity-0"
              } transition-opacity duration-1000`}
              style={{ fontSize: "35px", margin: "0" }}
            >
              Life-giving Breakthroughs
            </span>
          </h1>
        </div>
        <div className="justify-end mb-2 ml-8 w-full">
          <p
            className={`text-background font-serif items-end ${
              showTitle
                ? "opacity-100 animate-fadeInLeft animate-delay-1400"
                : "opacity-0"
            } transition-opacity 
              duration-1000 transform hover:translate-x-2 
              transition-transform ease-in-out duration-1000`}
          >
            Disclaimer: This website is a term project exercise for WPI CS 3733
            Software Engineering (Prof. Wong) and is not to be confused
            <p>with the actual Brigham & Women’s Hospital website</p>
          </p>
        </div>
      </div>
      <div className="flex flex-col w-1/3">
        <button className="h-2/5 p-4 bg-primary flex flex-col">
          <a href="map" className="h-full flex flex-col justify-center">
            <h1
              className="text-background
            font-header
            text-wrap
            text-4xl
            m-9"
            >
              <strong>Touch here to view the map</strong>
            </h1>
          </a>
        </button>
        <div className="bg-secondary h-1/2 flex">
          <img
            src={mapImg}
            className="object-cover object-center"
            alt="Map Preview"
          />
        </div>
        <button
          className="bg-primary text-background flex-1 font-body"
          onClick={setLoginOpen}
        >
          <h1>
            Staff Member? <strong>Login Here</strong>
          </h1>
        </button>
      </div>
      {/*<Dialog open={dialogOpen} onClose={setLoginClose}>*/}
      {/*  <LoginDialog />*/}
      {/*</Dialog>Dialog*/}
    </div>
  );
}

export default HeroPage;
