import React from "react";
import * as SVG from "react-native-svg";

interface Props {
  fillColor: string;
}

const TopSVG = (props: Props) => {
  const { SvgXml } = SVG;
  const { fillColor } = props;

  const xml = `
  <svg
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M1.25,17.5 L1.25,7.5 L6.25,7.5 L6.25,17.5 L1.25,17.5 Z M12.49995,17.5001 L7.49995,17.5001 L7.49995,5.0001 L4.99995,5.0001 L9.99995,0.0006 L14.99995,5.0001 L12.49995,5.0001 L12.49995,17.5001 Z M13.75,17.5 L13.75,12.5 L18.75,12.5 L18.75,17.5 L13.75,17.5 Z"
      ></path>
    </g>
  </svg>
  `;

  return <SvgXml xml={xml} width="100%" height="100%" fill={fillColor} />;
};

export default TopSVG;
