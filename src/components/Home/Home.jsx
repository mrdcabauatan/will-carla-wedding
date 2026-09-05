import { useEffect, useState } from "react";
import "./Home.css";
import monogram from "../../assets/front-monogram.png";

function Home({ onEnterInvitation }) {
  const weddingDate = new Date("2026-12-10T15:30:00");

  const isMobile = window.innerWidth <= 1024;

  const calculateTimeLeft = () => {
    const difference = weddingDate - new Date();

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0",
      ),

      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0",
      ),

      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
        2,
        "0",
      ),

      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        {/* MONOGRAM */}
        <div className="monogram-wrapper">
          <img src={monogram} alt="Wedding Monogram" className="monogram" />
        </div>

        <p className="invitation-text">
          WE INVITE YOU TO THE
          <br />
          WEDDING OF
        </p>

        <h1 className="title">
          <span className="couple-name">Willfred</span>
          <span className="and">&</span>
          <span className="couple-name">Carla</span>
        </h1>

        <p className="invitation-text">
          LOVE STORY AND THE BEGINNING
          <br />
          OF FOREVER
        </p>

        {/* WEDDING DETAILS */}
        <div className="wedding-details">
          <div className="wedding-month">DECEMBER</div>
          <div className="date-row">
            <div className="date-line"></div>
            <div className="day-name">THURSDAY</div>
            <div className="date-circle">
              <span>10</span>
            </div>
            <div className="time-name">
              AT <span>3:30</span> PM
            </div>
            <div className="date-line"></div>
          </div>
          <div className="wedding-year">2026</div>
          <div className="wedding-location">San Agustin Church, Intramuros</div>
        </div>

        {/* COUNTDOWN */}
        <div className="countdown">
          <div className="time-box">
            <div className="time-content">
              <h3>{timeLeft.days}</h3>
              <span>DAYS</span>
            </div>
          </div>

          <div className="time-box">
            <div className="time-content">
              <h3>{timeLeft.hours}</h3>
              <span>HOURS</span>
            </div>
          </div>

          <div className="time-box">
            <div className="time-content">
              <h3>{timeLeft.minutes}</h3>
              <span>MINUTES</span>
            </div>
          </div>

          <div className="time-box">
            <div className="time-content">
              <h3>{timeLeft.seconds}</h3>
              <span>SECONDS</span>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div
          className="scroll-indicator"
          onClick={onEnterInvitation}
          style={{ cursor: "pointer" }}
        >
          <div className={isMobile ? "mouse-mobile" : "mouse"}>
            <span>{isMobile ? "↓" : "→"}</span>
          </div>

          <p className="scroll-text">TAP TO ENTER</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
