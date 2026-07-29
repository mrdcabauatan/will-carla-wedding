import "./GiftRegistry.css";
import { useState } from "react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxNw8L0mYqR8i-O3fkTpS5tGKqeAzqcd9vD9Y1A1iv3g8mDUthdzJGS8iQML1mn7iz72A/exec";

function GiftRegistry({ guestInfo, showAlert }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendWish = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      showAlert({
        title: "Wedding Wishes",
        message: "Please enter your message before sending.",
      });
      return;
    }

    setLoading(true);

    try {
      const payload = new URLSearchParams();

      payload.append(
        "payload",
        JSON.stringify({
          action: "message",
          name: guestInfo.firstName + " " + guestInfo.lastName,
          message: message,
        }),
      );

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: payload,
      });

      showAlert({
        title: "Wedding Wishes",
        message:
          "Thank you for your heartfelt wishes! ❤️ Your message means so much to us.",
      });

      setMessage("");
    } catch (error) {
      showAlert({
        title: "Wedding Wishes",
        message: "Unable to send your message. Please try again.",
      });
    }

    setLoading(false);
  };

  return (
    <section className="gift-section section-page" id="gift">
      <div className="gift-container section-container">
        <h2 className="gift-title section-title">Gift Registry</h2>

        <div className="gift-content">
          <h3 className="gift-heading">
            Your love and support mean the world to us.
          </h3>

          <p className="gift-description">
            Your presence at our wedding is truly the greatest gift we could
            receive. If you would like to honor us with a gift, a monetary
            blessing would be deeply appreciated as we begin our journey
            together. Every gift, prayer, and kind thought is sincerely
            appreciated.
            <br />
            Thank you for your love and support.
          </p>

          <div className="wish-card">
            <h3 className="wish-title">Leave a Wedding Wish</h3>

            <p className="wish-subtitle">
              We'd love to read your heartfelt message and blessings.
            </p>

            <form onSubmit={sendWish}>
              <textarea
                className="wish-textarea"
                placeholder="Write your message here..."
                value={message}
                maxLength={1000}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button className="wish-button" disabled={loading}>
                {loading ? "Sending..." : "💌 Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GiftRegistry;
