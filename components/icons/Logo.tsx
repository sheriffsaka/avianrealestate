
import React from 'react';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 64 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Avian Real Estate Logo"
  >
    <path
      d="M32 8C32 8 34 10 35 12C36.5 14.5 36 18.5 35 20C34.5 20.5 32 22 32 22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32 8C32 8 30 10 29 12C27.5 14.5 28 18.5 29 20C29.5 20.5 32 22 32 22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32 22L30 24H34L32 22Z"
      fill="currentColor"
    />
    <path
      d="M32 2C20 4 2 18 2 18C2 18 14 14 24 16C24 16 20 28 32 28C44 28 40 16 40 16C50 14 62 18 62 18C62 18 44 4 32 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 34H26V46H24V34Z"
      fill="currentColor"
    />
    <path
      d="M30 30H34V46H30V30Z"
      fill="currentColor"
    />
    <path
      d="M38 34H40V46H38V34Z"
      fill="currentColor"
    />
    <path
      d="M22 46H42"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
