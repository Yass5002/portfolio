"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface HeroSliderProps {
  images: string[];
  title: string;
}

export default function HeroSlider({ images, title }: HeroSliderProps) {
  const [slide, setSlide] = useState(0);
  const count = images.length;
  const isMulti = count > 1;

  const goPrev = useCallback(() => {
    setSlide((s) => (s - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setSlide((s) => (s + 1) % count);
  }, [count]);

  if (count === 0) return null;

  return (
    <div
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        background: "var(--card)",
        border: "1px solid var(--border)",
        padding: "12px",
      }}
    >
      <div className="hero-slider-track">
        <div
          style={{
            display: "flex",
            height: "100%",
            transition: "transform .5s cubic-bezier(.4,0,.2,1)",
            transform: `translateX(-${slide * 100}%)`,
          }}
        >
          {images.map((src, i) => (
            <div key={src} className="hero-slider-slide">
              <Image
                src={src}
                fill
                alt={`${title} screenshot ${i + 1}`}
                className="hero-slider-img"
                priority={i === 0}
                sizes="(max-width: 1040px) 100vw, 980px"
              />
            </div>
          ))}
        </div>

        {isMulti && (
          <>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "16px",
                transform: "translateY(-50%)",
                zIndex: 4,
              }}
            >
              <button className="detail-nav-btn" onClick={goPrev} aria-label="Previous image">
                ‹
              </button>
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "16px",
                transform: "translateY(-50%)",
                zIndex: 4,
              }}
            >
              <button className="detail-nav-btn" onClick={goNext} aria-label="Next image">
                ›
              </button>
            </div>
          </>
        )}
      </div>

      {isMulti && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "9px",
            padding: "14px 0 6px",
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === slide ? "26px" : "9px",
                height: "9px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                padding: 0,
                background:
                  i === slide
                    ? "var(--accent)"
                    : "var(--border)",
                transition:
                  "width .35s cubic-bezier(.2,.9,.3,1.3), background .3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
