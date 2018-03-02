import React from 'react';

const ARAIcon = props => (
  <svg
    className={props.className}
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 480 480"
    // preserveAspectRatio="xMidYMid meet"
  >
    <g
      // transform="translate(0.000000,16.000000) scale(0.7,0.7)"
      // transform="rotate(180) translate(0, -50) scale(0.07,0.07)"
      // transform="scale(0.07,0.07)"
      transform="translate(0,480) scale(0.07,-0.07)"
      // fill="#000000"
      // stroke="none"
    >
      <path d="M0 3500 l0 -3500 3500 0 3500 0 0 3500 0 3500 -3500 0 -3500 0 0
        -3500z m6335 1392 l-375 -2 0 -2145 0 -2145 -2822 0 -2823 0 55 54 c1282 1257
        2575 2516 2581 2514 5 -2 131 -122 280 -267 l270 -264 57 54 c31 30 98 94 149
        143 l92 90 216 -210 c119 -115 265 -256 325 -312 l110 -104 0 1296 0 1296
        -377 0 -378 0 755 755 755 755 753 -752 752 -753 -375 -3z"
      />
    </g>
  </svg>
);

export default ARAIcon;
