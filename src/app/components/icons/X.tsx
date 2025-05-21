import React from 'react';

interface XIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const X = ({
  size = 24,
  ...props
}: XIconProps) => (
  <svg
    width={size}
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="5"
    {...props}
  >
    {/* Complete line (from top-left to bottom-right) */}
    <path d="M20,20 L80,80" stroke="currentColor" strokeWidth="6" />
    
    {/* Broken line (from top-right to bottom-left with larger gap) */}
    <path d="M20,80 L42,58" stroke="currentColor" strokeWidth="6" />
    <path d="M58,42 L80,20" stroke="currentColor" strokeWidth="6" />
  </svg>
);
