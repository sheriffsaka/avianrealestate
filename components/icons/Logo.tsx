
import React from 'react';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    {...props}
  >
    <path d="M20.73 16.44c-.29 1.4-.6 2.45-1.8 3.03-1.44.7-2.9-.1-3.78-1.32-.85-1.22-.99-2.81-.36-4.21.62-1.4 1.93-2.3 3.39-2.19 1.46.11 2.75 1.2 3.27 2.6.3 1 .45 2 .28 3.09zM3.27 16.44c.29 1.4.6 2.45 1.8 3.03 1.44.7 2.9-.1 3.78-1.32.85-1.22.99-2.81.36-4.21-.62-1.4-1.93-2.3-3.39-2.19-1.46.11-2.75 1.2-3.27 2.6-.3 1-.45 2-.28 3.09z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v3.5m0 0L14.5 21M12 17.5L9.5 21M7 3.34C8.47 2.49 10.18 2 12 2s3.53.49 5 1.34" />
  </svg>
);
