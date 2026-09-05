import { useEffect, useState } from "react";
import "./Home.css";

function Home({ onEnterInvitation }) {
  const weddingDate = new Date("2026-12-10T16:00:00");

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
        <h1 className="title">
          Willfred & Carla
        </h1>
        <h2 className="home-subtitle">December 10, 2026 | 4:00 PM</h2>
        <p className="description">
          An evening of timeless elegance 
          <br />
          as two hearts become one.
        </p>
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
        <div
          className="scroll-indicator"
          onClick={onEnterInvitation}
          style={{ cursor: "pointer" }}
        >
          <div className={isMobile ? "mouse-mobile" : "mouse"}>
            <span>{isMobile ? "↓" : "→"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
