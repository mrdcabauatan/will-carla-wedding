import { useState, useRef } from "react";
import "./Intro.css";
import introVideo from "../../assets/intro.mp4";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxNw8L0mYqR8i-O3fkTpS5tGKqeAzqcd9vD9Y1A1iv3g8mDUthdzJGS8iQML1mn7iz72A/exec";

const Intro = ({ onFinish, setGuestInfo, setSuccessLogin, showAlert }) => {
  const [showModal, setShowModal] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const videoRef = useRef(null);

  const handleEnter = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      showAlert({
        title: "Guest Verification",
        message: "Please enter your first name and last name.",
      });
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await fetch(
        `${GOOGLE_SCRIPT_URL}?firstName=${encodeURIComponent(
          firstName.trim(),
        )}&lastName=${encodeURIComponent(lastName.trim())}`,
      );

      const result = await response.json();

      if (!result.exists) {
        setIsLoggingIn(false);
        showAlert({
          title: "Guest Not Found",
          message:
            "Sorry, your name is not on the guest list. Please contact Carla De Juan or Will Tauro for further assistance.",
        });
        return;
      }

      setGuestInfo({
        firstName: result.firstName,
        lastName: result.lastName,
        role: result.role,
        churchAttendance: result.churchAttendance,
        receptionAttendance: result.receptionAttendance,
        companion: result.companion,
        group: result.group,
        companionNames: result.companionNames || [],
      });

      setSuccessLogin(true);
      setShowModal(false);

      try {
        await videoRef.current.play();
      } catch (err) {
        console.error(err);
      }

      setSuccessLogin(true);

      setShowModal(false);

      try {
        await videoRef.current.play();
      } catch (err) {
        console.error(err);
      }
    } catch (error) {
      setIsLoggingIn(false);
      console.error(error);

      showAlert({
        title: "Guest Verification",
        message: "Unable to verify guest information. Please try again.",
      });
    }
  };

  const handleVideoEnd = () => {
    setIsLeaving(true);
    onFinish();
  };

  const handleNameChange = (setter) => (e) => {
    const value = e.target.value;

    if (/^[A-Za-z\s]*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <div className={`intro ${isLeaving ? "intro-leave" : ""}`}>
      <video
        ref={videoRef}
        className="intro-video"
        src={introVideo}
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
      />

      <div className="video-overlay" />

      {showModal && (
        <div className="intro-modal-backdrop">
          <div className="intro-modal">
            <h1 className="intro-title">
              Welcome! Please enter your full name.
            </h1>

            <input
              type="text"
              placeholder="First Name"
              className="intro-input"
              value={firstName}
              onChange={handleNameChange(setFirstName)}
              disabled={isLoggingIn}
            />

            <input
              type="text"
              placeholder="Last Name"
              className="intro-input"
              value={lastName}
              onChange={handleNameChange(setLastName)}
              disabled={isLoggingIn}
            />

            <button
              className="intro-button"
              onClick={handleEnter}
              disabled={isLoggingIn}
            >
              {!isLoggingIn ? "Submit" : "Please wait for a moment..."}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Intro;
