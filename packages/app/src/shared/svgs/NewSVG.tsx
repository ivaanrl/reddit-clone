import React from "react";
import * as SVG from "react-native-svg";

interface Props {
  fillColor: string;
}

const NewSVG = (props: Props) => {
  const { SvgXml } = SVG;
  const { fillColor } = props;

  const xml = `
  <svg
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <polygon
        points="17.16 10 19.07 12.936 15.799 14.188 15.619 17.686 12.237 16.776 10.035 19.5 7.833 16.776 4.451 17.686 4.271 14.188 1 12.936 2.91 10 1 7.065 4.271 5.812 4.451 2.315 7.833 3.224 10.035 .5 12.237 3.224 15.619 2.315 15.799 5.812 19.07 7.065"
      ></polygon>
    </g>
  </svg>
  `;

  return <SvgXml xml={xml} width="100%" height="100%" fill={fillColor} />;
};

export default NewSVG;
