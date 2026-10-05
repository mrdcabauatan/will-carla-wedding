import "./Reminders.css";

export default function Reminders() {
  return (
    <section className="reminders-section section-page" id="reminders">
      <div className="reminders-container section-container">
        <h2 className="reminders-title section-title">Reminders</h2>

        <div className="reminders-content">
          <p className="reminders-description">
            We kindly ask our guests to take note of these reminders so everyone
            can enjoy and celebrate our special day comfortably.
          </p>

          <div className="reminders-guidelines">
            <ol>
              <li>
                Please arrive on time so you don’t miss any special moments.
              </li>

              <li>
                We've reserved a seat especially for you! To keep our day
                intimate, we kindly ask that only those named on the invitation
                attend. We appreciate your kind understanding.
              </li>

              <li>
                Help us capture every special moment by keeping the aisle clear
                for our photographers and videographers. Feel free to take
                photos and videos from your seat and thank you for being part
                of our day.
              </li>

              <li>
                Kindly adhere to the dress code and help us create a beautifully
                coordinated celebration.
              </li>

              <li>
                While we adore your little ones, this will be an adults-only
                affair. We hope you enjoy a well-deserved night out!
              </li>

              <li>
                If you have any questions or need a little help along the way,
                please don't hesitate to reach out to Willfred Tauro or Carla De
                Juan. We'd be delighted to assist you.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
