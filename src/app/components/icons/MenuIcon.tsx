import React from 'react';

interface MenuIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const Menu = ({
  size = 24,
  ...props
}: MenuIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="1.08" x2="20.08" y1="10.93" y2="10.93" />
    <line x1="6.96" x2="22.96" y1="5.68" y2="5.68" />
    <line x1="1" x2="17" y1="16.33" y2="16.33" />
  </svg>
);
