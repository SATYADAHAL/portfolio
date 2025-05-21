import React from 'react';

interface X extends React.SVGProps<SVGSVGElement> {
  size?: number;
  gapSize?: number;
}

export const XLetter = ({
  size = 24,
  gapSize = 0.5, // Relative to strokeWidth
  ...props
}: X) => {
  const strokeWidth = 2; // Matching your Menu icon style
  const halfGap = (strokeWidth * gapSize) / 2;
  const center = 12; // Half of 24 (size)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Solid line (top-left to bottom-right) */}
      <line x1="4" y1="4" x2="20" y2="20" />
      
      {/* Broken line (top-right to bottom-left with gap) */}
      <line x1="20" y1="4" x2={center + halfGap} y2={center - halfGap} />
      <line x1={center - halfGap} y1={center + halfGap} x2="4" y2="20" />
    </svg>
  );
};
