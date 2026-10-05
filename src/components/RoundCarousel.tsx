"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface RoundCarouselItem {
  src: string;
  name: string;
}

interface RoundCarouselProps {
  items?: RoundCarouselItem[];
  imageWidth?: number;
  imageHeight?: number;
  spacing?: number;
  speed?: number;
  direction?: "right" | "left";
  drag?: boolean;
  sensitivity?: number;
  tilt?: number;
  perspective?: number;
  cornerRadius?: number;
  innerDim?: number;
  background?: string;
  style?: React.CSSProperties;
}

const DEFAULT_ITEMS: RoundCarouselItem[] = [
  { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/e60dd7f7-a44f-40a7-df62-095b19cd8700/w=800", name: "Tech" },
];

function OriginkitBaseRoundCarousel({
  items = DEFAULT_ITEMS,
  imageWidth = 130, // Slightly wider for text
  imageHeight = 160, // Taller to fit the text below the image
  spacing = 4,
  speed = 7,
  direction = "right",
  drag = true,
  sensitivity = 5,
  tilt = -5,
  perspective = 3000,
  cornerRadius = 24,
  innerDim = 2.5,
  background = "transparent",
  style = {},
}: RoundCarouselProps) {
  const dataItems = items.length > 0 ? items : DEFAULT_ITEMS;
  const count = dataItems.length;

  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const rotYRef = useRef(0);
  const velRef = useRef(0);
  const lastRef = useRef(0);
  const dragRef = useRef({ active: false, x: 0 });

  const angle = 360 / count;
  const factor = 1 + spacing * 0.15;
  const radius = (imageWidth * factor) / (2 * Math.tan(Math.PI / count));
  const radiusPx = cornerRadius;
  const degPerSec = speed * 6 * (direction === "left" ? -1 : 1);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const apply = () =>
      (ring.style.transform = `translateZ(${-radius}px) rotateY(${rotYRef.current}deg)`);
    apply();

    const draw = (now: number) => {
      const dt = lastRef.current ? (now - lastRef.current) / 1800 : 0;
      lastRef.current = now;
      const f = Math.min(dt, 0.1);
      const d = dragRef.current;
      if (!d.active) {
        if (Math.abs(velRef.current) > 0.01) {
          rotYRef.current += velRef.current * f;
          velRef.current *= 0.94;
        } else {
          rotYRef.current += degPerSec * f;
        }
      }
      apply();
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [radius, degPerSec, count]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!drag) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragRef.current = { active: true, x: e.clientX };
    velRef.current = 0;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    d.x = e.clientX;
    const k = 0.3 * sensitivity;
    rotYRef.current += dx * k;
    velRef.current = dx * k * 60;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    dragRef.current.active = false;
  };

  const faceBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: radiusPx,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.75)", // Light Frosted glass base
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(0, 0, 0, 0.08)", // Subtle dark border
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
  };

  return (
    <div
      style={{
        ...style,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background,
        perspective: `${perspective}px`,
        cursor: drag ? "grab" : "default",
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt}deg)`,
        }}
      >
        <div
          ref={ringRef}
          style={{
            position: "relative",
            width: imageWidth,
            height: imageHeight,
            transformStyle: "preserve-3d",
          }}
        >
          {dataItems.map((item, i) => {
            const src = item?.src;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front Face */}
                <div
                  style={{
                    ...faceBase,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)", // Softer shadow for light mode
                  }}
                >
                  {src && <Image src={src} alt="" width={72} height={88} style={{ width: "55%", height: "55%", objectFit: "contain", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }} draggable={false} />}
                  <span style={{ color: "rgba(0, 0, 0, 0.8)", fontSize: "14px", fontWeight: 700, letterSpacing: "0.5px", fontFamily: "system-ui, sans-serif" }}>{item.name}</span>
                </div>
                {/* Back Face */}
                <div
                  style={{
                    ...faceBase,
                    transform: "rotateY(180deg)",
                    filter: `brightness(${innerDim / 5})`, // Less dimming for light mode
                  }}
                >
                  {src && <Image src={src} alt="" width={72} height={88} style={{ width: "55%", height: "55%", objectFit: "contain", opacity: 0.6 }} draggable={false} />}
                  <span style={{ color: "rgba(0, 0, 0, 0.4)", fontSize: "14px", fontWeight: 700, letterSpacing: "0.5px", fontFamily: "system-ui, sans-serif" }}>{item.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const __originkitPresetProps = {
  "imageWidth": 130,
  "imageHeight": 160,
  "spacing": 5,
  "direction": "left",
  "tilt": -5,
  "cornerRadius": 24,
  "innerDim": 2.5
} satisfies RoundCarouselProps;

export default function RoundCarousel(props: RoundCarouselProps) {
  return <OriginkitBaseRoundCarousel {...__originkitPresetProps} {...props} />;
}
