import "./Attire.css";
import { INVITATION_CONTENT } from "../constants/invitation_roles";

export default function Attire({ roleId }) {
  const content = INVITATION_CONTENT[roleId] ?? INVITATION_CONTENT[0];
  const attire = content.attire;

  return (
    <section className="attire-section section-page" id="attire">
      <div className="attire-container section-container">
        <h2 className="attire-title section-title">Attire Guide</h2>

        <div className="attire-content">
          <h3
            className="attire-heading"
            dangerouslySetInnerHTML={{ __html: attire.heading }}
          />

          <p className="dress-description">
            We would love to see our family and friends dressed in elegant,
            timeless, and comfortable attire that complements the romantic
            atmosphere of our wedding celebration.
          </p>

          <div className="attire-showcase">
            <div className="attire-image">
              <img src={attire.image} alt={attire.heading} />
            </div>

            <div className="color-palette">
              <div className="color-row">
                {attire.palette.slice(0, 3).map((color) => (
                  <span key={color} className={`palette color${color}`} />
                ))}
              </div>

              {attire.palette.length > 3 && (
                <div className="color-row">
                  {attire.palette.slice(3).map((color) => (
                    <span key={color} className={`palette color${color}`} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="attire-guidelines">
            <h4>Additional Guidelines</h4>

            <ol>
              <li>
                Kindly wear attire that is modest and appropriate for a
                religious ceremony.
              </li>

              <li>
                Your presence is the greatest gift we could ask for. Dress
                comfortably and celebrate this special day with us.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
