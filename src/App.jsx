import { useState, useRef, useEffect } from "react";

import Intro from "./components/Intro/Intro";
import Navbar from "./components/Navbar/Navbar";
import PetalOverlay from "./components/PetalOverlay/PetalOverlay";
import Home from "./components/Home/Home";
import Invitation from "./components/Invitation/Invitation";
import Attire from "./components/Attire/Attire";
import GiftRegistry from "./components/GiftRegistry/GiftRegistry";
import Gallery from "./components/Gallery/Gallery";
import Details from "./components/Details/Details";
import Rsvp from "./components/Rsvp/Rsvp";
import bgMusic from "./assets/bgmusic.mp3";
import AlertModal from "./components/AlertModal/AlertModal";
import useAlert from "./hooks/useAlert";
import { ROLE_MAP } from "./components/constants/invitation_roles";

const App = () => {
  const { alert, showAlert, closeAlert } = useAlert();
  const [currentPage, setCurrentPage] = useState("home");
  const [showIntro, setShowIntro] = useState(true);
  const [successLogin, setSuccessLogin] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    role: "",
    churchAttendance: "",
    receptionAttendance: "",
    companion: 0,
    group: "",
    companionNames: [],
  });

  const audioRef = useRef(null);

  const roleId = ROLE_MAP[guestInfo.role] ?? 0;

  const isAttending =
    guestInfo.churchAttendance === "Attending" ||
    guestInfo.receptionAttendance === "Attending";

  const isMobileOrTablet = () => {
    return window.innerWidth <= 1024;
  };

  const pages = ["home", "invitation", "attire", "gallery", "gift"];

  if (isAttending) {
    pages.push("details");
  }

  pages.push("rsvp");

  const currentIndex = pages.indexOf(currentPage);

  if (!audioRef.current) {
    audioRef.current = new Audio(bgMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
  }

  const startMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((err) => console.log(err));
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const handleIntroFinish = () => {
    startMusic();

    setTimeout(() => {
      setShowIntro(false);

      setTimeout(() => {
        setShowHome(true);
      }, 500);
    }, 1200);
  };

  return (
    <div className="app-container">
      {showIntro && (
        <Intro
          onFinish={handleIntroFinish}
          setGuestInfo={setGuestInfo}
          setSuccessLogin={setSuccessLogin}
          showAlert={showAlert}
        />
      )}

      {successLogin && showHome && (
        <div>
          {!isMobileOrTablet() && currentPage !== "home" && (
            <Navbar setCurrentPage={changePage} isAttending={isAttending} />
          )}

          <PetalOverlay />

          {isMobileOrTablet() ? (
            <div>
              <div className="page">
                <Home
                  onEnterInvitation={() => {
                    document
                      .getElementById("invitation")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              </div>

              <div id="invitation" className="page">
                <Invitation
                  name={`${guestInfo.firstName.toUpperCase()} ${guestInfo.lastName.toUpperCase()}`}
                  roleId={roleId}
                />
              </div>

              <div className="page">
                <Attire roleId={roleId} />
              </div>

              <div className="page">
                <Gallery />
              </div>

              <div className="page">
                <GiftRegistry guestInfo={guestInfo} showAlert={showAlert} />
              </div>

              {isAttending && (
                <div className="page">
                  <Details guestInfo={guestInfo} />
                </div>
              )}

              <div className="page">
                <Rsvp
                  guestInfo={guestInfo}
                  setGuestInfo={setGuestInfo}
                  showAlert={showAlert}
                />
              </div>
            </div>
          ) : (
            <div
              className="page-slider"
              style={{
                transform: `translateX(-${currentIndex * 100}vw)`,
              }}
            >
              <div className="page">
                <Home onEnterInvitation={() => changePage("invitation")} />
              </div>

              <div className="page">
                <Invitation
                  name={`${guestInfo.firstName.toUpperCase()} ${guestInfo.lastName.toUpperCase()}`}
                  roleId={roleId}
                />
              </div>

              <div className="page">
                <Attire roleId={roleId} />
              </div>

              <div className="page">
                <Gallery />
              </div>

              <div className="page">
                <GiftRegistry guestInfo={guestInfo} showAlert={showAlert} />
              </div>

              {isAttending && (
                <div className="page">
                  <Details guestInfo={guestInfo} />
                </div>
              )}

              <div className="page">
                <Rsvp
                  guestInfo={guestInfo}
                  setGuestInfo={setGuestInfo}
                  showAlert={showAlert}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <AlertModal
        open={alert.open}
        title={alert.title}
        message={alert.message}
        confirmText={alert.confirmText}
        cancelText={alert.cancelText}
        showCancel={alert.showCancel}
        onConfirm={() => {
          alert.onConfirm?.();
          closeAlert();
        }}
        onCancel={closeAlert}
      />
    </div>
  );
};

export default App;
