import "./Rsvp.css";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import RsvpForm from "./components/RsvpForm";

function RSVP({ guestInfo, setGuestInfo, showAlert }) {
  const [showModal, setShowModal] = useState(false);
  const [rsvpSubmitted, isRsvpSubmitted] = useState(false);

  const isNotYetResponding =
    guestInfo.churchAttendance === "Not Yet Responding" &&
    guestInfo.receptionAttendance === "Not Yet Responding";
  const isNotAttending =
    guestInfo.churchAttendance === "Not Attending" ||
    guestInfo.receptionAttendance === "Not Attending";

  const RSVP_DEADLINE = new Date("2026-11-07T23:59:59");
  const isRsvpClosed = new Date() > RSVP_DEADLINE;

  useEffect(() => {
    if (!rsvpSubmitted) return;

    const isAttending =
      guestInfo.churchAttendance === "Attending" ||
      guestInfo.receptionAttendance === "Attending";

    if (!isAttending) return;

    const timer = setTimeout(() => {
      const detailsSection = document.getElementById("details");

      if (detailsSection) {
        detailsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      isRsvpSubmitted(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [
    rsvpSubmitted,
    guestInfo.churchAttendance,
    guestInfo.receptionAttendance,
  ]);

  return (
    <>
      <section id="rsvp" className="rsvp-page section-page">
        <div className="rsvp-container section-container">
          <h1 className="rsvp-title section-title">RSVP</h1>

          <div className="rsvp-info">
            <div className="rsvp-info-card">
              <div className="rsvp-icon">
                <CalendarDays size={32} />
              </div>

              <h3>Date</h3>
              <p>December 10, 2026</p>
            </div>

            <div className="rsvp-info-card">
              <div className="rsvp-icon">
                <Clock3 size={32} />
              </div>

              <h3>Time</h3>
              <p>4:00 PM</p>
            </div>

            <div className="rsvp-info-card">
              <div className="rsvp-icon">
                <MapPin size={32} />
              </div>

              <h3>Location</h3>
              <p>
                Intramuros, <br /> Metro Manila
              </p>
            </div>
          </div>

          <div className="rsvp-message">
            {isRsvpClosed ? (
              <>
                <p>Thank you for your interest in celebrating with us</p>
                <p>
                  The RSVP deadline has already passed. If you still wish to
                  join us, please contact Carla De Juan or Will Tauro for
                  further assistance.
                </p>
              </>
            ) : (
              <>
                <p>
                  Please confirm your attendance by clicking the link below.
                </p>
                <p>We can't wait to share this moment with you.</p>
              </>
            )}
          </div>

          {isRsvpClosed ? (
            <span className="rsvp-link disabled">RSVP Closed</span>
          ) : (
            <a
              href="#"
              className="rsvp-link"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              RSVP Now
            </a>
          )}

          <div className="rsvp-deadline">
            <h4>
              RSVP Deadline:
              <span> November 07, 2026</span>
            </h4>

            <p>
              Please respond on or before this date to help us finalize our
              arrangements.
            </p>
          </div>

          <div className="rsvp-reminders">
            <h2>Important Reminders</h2>

            <ul>
              <li>Kindly arrive 30 minutes before the ceremony.</li>
              <li>
                Kindly note that guests are by name invitation only and no plus
                ones can be accommodated
              </li>
              <li>Refrain from using your phone during the ceremony</li>
              <li>
                For the comfort and safety of all, we kindly request no pets and
                no children.
              </li>
              <li>Adhere to the dresscode.</li>
            </ul>
          </div>
        </div>
      </section>

      {showModal &&
        createPortal(
          <div
            className="rsvp-modal-overlay"
            onClick={() => setShowModal(false)}
          >
            <div className="rsvp-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>

              {isNotYetResponding || isNotAttending ? (
                <>
                  <p>
                    We are very excited to celebrate our wedding day with our
                    family and friends. Please let us know whether you'll be
                    able to join us by submitting your RSVP below.
                  </p>

                  <RsvpForm
                    guestInfo={guestInfo}
                    setGuestInfo={setGuestInfo}
                    onClose={() => setShowModal(false)}
                    isRsvpSubmitted={isRsvpSubmitted}
                    showAlert={showAlert}
                  />
                </>
              ) : (
                <p>
                  Thank you! Your RSVP has already been submitted.
                  <br />
                  <br />
                  If you need to update your RSVP, please contact Carla De Juan
                  or Will Tauro and they will be happy to assist you.
                </p>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default RSVP;
