import * as React from "react";

const RightArrow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 80 24"
    width={80}
    height={24}
    {...props}
  >
    <path
      d="M5 12L70 12M70 12L64 18"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default RightArrow;
