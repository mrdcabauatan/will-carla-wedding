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
                We kindly ask that you arrive on time to ensure you don't miss
                any special moments.
              </li>

              <li>
                We've reserved a seat especially for you! To keep our day
                intimate, we kindly ask that only those named on the invitation
                attend. We appreciate your kind understanding.
              </li>

              <li>
                We know you'll want to capture our special moments! We kindly
                ask that please refrain from stepping into the aisle or blocking
                the assigned Photographers/Videographers while they are working.
                This will help them capture all the beautful moments of our day
                without obstruction. Please feel free to take photos and videos
                from your seats. We'd love for you to enjoy the moment with us
                while our professional team take care of capturing the memories.
              </li>

              <li>
                For the comfort and safety of all, we kindly request no pets.
              </li>

              <li>
                Kindly adhere to the dress code and help us create a beautifully
                coordinated celebration.
              </li>

              <li>
                While we adore your little ones, we have chosen to celebrate as
                an adult-only affiar. We hope this gives you a well-deserved
                night out.
              </li>
              <li>
                This day is dedicated to celebrating the couple. We Kindly ask
                that you refrain from any personal announcement (engagements,
                pregnancies, reveals, and the like).
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
