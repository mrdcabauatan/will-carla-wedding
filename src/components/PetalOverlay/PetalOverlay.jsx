import React, { memo, useMemo } from "react";
import "./PetalOverlay.css";

const PetalOverlay = () => {
  const petalCount = useMemo(() => {
    const width = window.innerWidth;

    if (width <= 480) return 12;
    if (width <= 768) return 10;
    if (width <= 1024) return 25;

    return 25;
  }, []);

  const petals = useMemo(
    () =>
      Array.from({ length: petalCount }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 20}s`,
        duration: `${18 + Math.random() * 12}s`,
        scale: 0.6 + Math.random() * 0.6,
      })),
    [petalCount],
  );

  return (
    <div className="petal-overlay" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            transform: `scale(${petal.scale})`,
          }}
        >
          <svg viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient
                id={`petalGradient-${petal.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <>
                  <stop offset="0%" stopColor="#2D436E" />
                  <stop offset="35%" stopColor="#24385D" />
                  <stop offset="75%" stopColor="#1C2B4A" />
                  <stop offset="100%" stopColor="#14213D" />
                </>
              </linearGradient>
            </defs>

            <path
              d="M20 0
                C35 5 40 20 35 35
                C30 45 20 50 20 50
                C20 50 10 45 5 35
                C0 20 5 5 20 0Z"
              fill={`url(#petalGradient-${petal.id})`}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default memo(PetalOverlay);
