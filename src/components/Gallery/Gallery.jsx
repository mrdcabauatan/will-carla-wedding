import "./Gallery.css";
import { useState, useEffect, useCallback } from "react";

const photos = Object.entries(
  import.meta.glob("../../assets/gallery/*.{png,jpg,jpeg,webp,avif}", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  )
  .map(([, image]) => image);

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);

  const changeSlide = useCallback((direction = 1) => {
    setFade(true);

    setTimeout(() => {
      setCurrent((prev) => {
        if (direction === 1) {
          return prev === photos.length - 1 ? 0 : prev + 1;
        }

        return prev === 0 ? photos.length - 1 : prev - 1;
      });

      setFade(false);
    }, 250);
  }, []);

  const next = useCallback(() => {
    changeSlide(1);
  }, [changeSlide]);

  const previous = useCallback(() => {
    changeSlide(-1);
  }, [changeSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(interval);
  }, [next]);

  const getIndex = (offset) => {
    return (current + offset + photos.length) % photos.length;
  };

  return (
    <section className="gallery-section section-page" id="gallery">
      <div className="gallery-container section-container">
        <h2 className="gallery-title section-title">Our Love Story</h2>

        <div className="gallery-content">
          <div className="gallery-wrapper">
            <div className="gallery-carousel">
              <img
                src={photos[getIndex(-2)]}
                className="gallery-image far-left"
                alt=""
              />

              <img
                src={photos[getIndex(-1)]}
                className="gallery-image left-image"
                alt=""
              />

              <img
                src={photos[current]}
                className={`gallery-image center-image ${
                  fade ? "fade-out" : "fade-in"
                }`}
                alt="Wedding gallery"
              />

              <img
                src={photos[getIndex(1)]}
                className="gallery-image right-image"
                alt=""
              />

              <img
                src={photos[getIndex(2)]}
                className="gallery-image far-right"
                alt=""
              />
            </div>
          </div>

          <div className="gallery-dots">
            {photos.map((_, index) => (
              <button
                key={index}
                className={index === current ? "dot active" : "dot"}
                onClick={() => {
                  if (index === current) return;

                  setFade(true);

                  setTimeout(() => {
                    setCurrent(index);
                    setFade(false);
                  }, 250);
                }}
              />
            ))}
          </div>

          <p className="gallery-quote">
            "Every love story is beautiful, but ours is our favorite."
          </p>
        </div>
      </div>
    </section>
  );
}
