"use client";

import { useId } from "react";

interface LogoIconProps {
  className?: string;
  size?: number;
}

export default function LogoIcon({ className = "logo-dot", size }: LogoIconProps) {
  const rawId = useId();
  const id = rawId.replace(/[:]/g, "");

  const sphereId = `sphere-${id}`;
  const yBeigeId = `yBeige-${id}`;
  const specularId = `specular-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{ display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={sphereId} cx="32%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="42%" stopColor="#9fb2ff" />
          <stop offset="100%" stopColor="#6c7cf0" />
        </radialGradient>

        <linearGradient id={yBeigeId} x1="25%" y1="20%" x2="75%" y2="85%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#ffe6d6" />
          <stop offset="70%" stopColor="#ffd2ba" />
          <stop offset="100%" stopColor="#ff9a76" />
        </linearGradient>

        <radialGradient id={specularId} cx="32%" cy="28%" r="46%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="80%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="47" fill={`url(#${sphereId})`} />

      <g transform="rotate(15 50 50)">
        <path
          d="M 33 29 L 50 51 L 50 73 M 67 29 L 50 51"
          fill="none"
          stroke={`url(#${yBeigeId})`}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <circle cx="50" cy="50" r="47" fill={`url(#${specularId})`} pointerEvents="none" />
    </svg>
  );
}
