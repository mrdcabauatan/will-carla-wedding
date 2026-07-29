import { useState, useEffect } from "react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxNw8L0mYqR8i-O3fkTpS5tGKqeAzqcd9vD9Y1A1iv3g8mDUthdzJGS8iQML1mn7iz72A/exec";

function RsvpForm({
  onClose,
  guestInfo,
  setGuestInfo,
  isRsvpSubmitted,
  showAlert,
}) {
  const [formData, setFormData] = useState({
    churchAttendance: "",
    receptionAttendance: "",
    companions: guestInfo.companionNames?.length
      ? guestInfo.companionNames
      : Array.from({ length: Number(guestInfo.companion || 0) }, () => ""),
  });

  const [loading, setLoading] = useState(false);

  const handleRadioButtonChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCompanionChange = (index, value) => {
    let sanitizedValue = value.replace(/[^A-Za-z\s]/g, "");

    sanitizedValue = sanitizedValue.replace(/\b\w/g, (char) =>
      char.toUpperCase(),
    );

    setFormData((prev) => {
      const companions = [...prev.companions];
      companions[index] = sanitizedValue;

      return {
        ...prev,
        companions,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedChurch =
        formData.churchAttendance || guestInfo.churchAttendance;

      const updatedReception =
        formData.receptionAttendance || guestInfo.receptionAttendance;

      setLoading(true);

      const payload = new URLSearchParams();

      payload.append(
        "payload",
        JSON.stringify({
          action: "rsvp",
          firstName: guestInfo.firstName,
          lastName: guestInfo.lastName,
          churchAttendance: updatedChurch,
          receptionAttendance: updatedReception,
          companion: guestInfo.companion,
          companionNames: formData.companions,
          group: guestInfo.group,
        }),
      );

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: payload,
      });

      setGuestInfo((prev) => ({
        ...prev,
        churchAttendance: formData.churchAttendance || prev.churchAttendance,
        receptionAttendance:
          formData.receptionAttendance || prev.receptionAttendance,
        companionNames: [...formData.companions],
      }));

      showAlert({
        title: "RSVP Received",
        message:
          "Thank you for your RSVP! We look forward to celebrating this special day with you.",
      });

      isRsvpSubmitted(true);

      onClose();
    } catch (error) {
      console.log(error);

      showAlert({
        title: "RSVP Submission Failed",
        message:
          "We're sorry but we couldn't submit your RSVP. Please try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData({
      churchAttendance: "",
      receptionAttendance: "",
      companions: guestInfo.companionNames?.length
        ? [...guestInfo.companionNames]
        : Array.from({ length: Number(guestInfo.companion || 0) }, () => ""),
    });
  }, [guestInfo]);

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      {guestInfo.churchAttendance !== "Attending" ? (
        <div className="attendance-group">
          <h3>Church Ceremony</h3>
          <div className="attendance-options">
            <label>
              <input
                type="radio"
                name="churchAttendance"
                value="Attending"
                checked={formData.churchAttendance === "Attending"}
                onChange={handleRadioButtonChange}
                disabled={loading}
                required
              />
              Yes, I'll attend
            </label>
            <label>
              <input
                type="radio"
                name="churchAttendance"
                value="Not Attending"
                checked={formData.churchAttendance === "Not Attending"}
                disabled={loading}
                onChange={handleRadioButtonChange}
              />
              Sorry, I can't make it
            </label>
          </div>
        </div>
      ) : (
        <p>
          You have already submitted your church attendance RSVP. Your previous
          response was: {guestInfo.churchAttendance}
        </p>
      )}

      {guestInfo.receptionAttendance !== "Attending" ? (
        <div className="attendance-group">
          <h3>Reception</h3>

          <div className="attendance-options">
            <label>
              <input
                type="radio"
                name="receptionAttendance"
                value="Attending"
                checked={formData.receptionAttendance === "Attending"}
                onChange={handleRadioButtonChange}
                disabled={loading}
                required
              />
              Yes, I'll attend
            </label>

            <label>
              <input
                type="radio"
                name="receptionAttendance"
                value="Not Attending"
                checked={formData.receptionAttendance === "Not Attending"}
                onChange={handleRadioButtonChange}
                disabled={loading}
              />
              Sorry, I can't make it
            </label>
          </div>
        </div>
      ) : (
        <p>
          You have already submitted your reception attendance RSVP. Your
          previous response was: {guestInfo.receptionAttendance}
        </p>
      )}

      {Number(guestInfo.companion) > 0 && (
        <div className="attendance-group">
          <h3>
            Please enter the full name
            {Number(guestInfo.companion) > 1 ? "s" : ""} of your companion
            {Number(guestInfo.companion) > 1 ? "s" : ""}
          </h3>

          <div className="companion-inputs">
            {formData.companions.map((name, index) => (
              <div className="companion-field" key={index}>
                <label htmlFor={`companion-${index}`}>
                  Companion {index + 1}
                </label>

                <input
                  id={`companion-${index}`}
                  type="text"
                  value={name}
                  disabled={loading}
                  placeholder={`Enter first and last name`}
                  onChange={(e) => handleCompanionChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <button type="submit" className="submit-rsvp-btn" disabled={loading}>
        {loading ? "Submitting..." : "Submit RSVP"}
      </button>
    </form>
  );
}

export default RsvpForm;
