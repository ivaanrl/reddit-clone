import React from "react";
import * as SVG from "react-native-svg";

interface Props {
  fillColor: string;
}

const HotSVG = (props: Props) => {
  const { SvgXml } = SVG;
  const { fillColor } = props;

  const xml = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <path d="M10.31.61a.5.5,0,0,0-.61,0C9.41.83,2.75,6.07,2.75,11.47a8.77,8.77,0,0,0,3.14,6.91.5.5,0,0,0,.75-.64,3.84,3.84,0,0,1-.55-2A7.2,7.2,0,0,1,10,9.56a7.2,7.2,0,0,1,3.91,6.23,3.84,3.84,0,0,1-.55,2,.5.5,0,0,0,.75.64,8.77,8.77,0,0,0,3.14-6.91C17.25,6.07,10.59.83,10.31.61Z"></path>
  </svg>
  `;

  return <SvgXml xml={xml} width="100%" height="100%" fill={fillColor} />;
};

export default HotSVG;
