import "./Details.css";

export default function Details({ guestInfo }) {
  const churchMap = "https://maps.app.goo.gl/485Q4cXNrrgTUviX6";
  const receptionMap = "https://maps.app.goo.gl/d9wL8HJghhcXrava6";

  return (
    <section className="details-section section-page" id="details">
      <div className="details-container section-container">
        <h2 className="details-title section-title">Venue Details</h2>

        <div className="details-grid">
          {guestInfo.churchAttendance === "Attending" && (
            <>
              <div className="details-card">
                <h3 className="details-heading">Church Ceremony</h3>

                <div className="mini-divider"></div>

                <h4 className="venue-name">San Agustin Church</h4>

                <p className="venue-address">
                  General Luna St., Intramuros,
                  <br />
                  Manila, 1002 Metro Manila
                </p>

                <div className="time-divider"></div>

                <p className="venue-time">4:00 PM</p>

                <a
                  href={churchMap}
                  target="_blank"
                  rel="noreferrer"
                  className="map-button primary-button"
                >
                  📍 View on Google Maps
                </a>
              </div>
            </>
          )}

          {guestInfo.receptionAttendance === "Attending" && (
            <>
              <div className="details-card">
                <h3 className="details-heading">Reception</h3>

                <div className="mini-divider"></div>

                <h4 className="venue-name">La Castellana</h4>

                <p className="venue-address">
                  Cabildo corner Beaterio streets,
                  <br />
                  Intramuros, Manila 1002
                </p>

                <div className="time-divider"></div>

                <p className="venue-time">6:00 PM</p>

                <a
                  href={receptionMap}
                  target="_blank"
                  rel="noreferrer"
                  className="map-button primary-button"
                >
                  📍 View on Google Maps
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
