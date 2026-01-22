
import React from 'react';

export const BathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    <line x1="8" x2="8" y1="6" y2="12" />
    <line x1="12" x2="12" y1="6" y2="12" />
    <line x1="16" x2="16" y1="6" y2="12" />
    <path d="M13 18h5a2 2 0 0 0 2-2v-2" />
  </svg>
);
