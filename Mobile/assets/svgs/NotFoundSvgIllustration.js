// src/assets/404-illustration.js
import Svg, { Circle, G, Path } from "react-native-svg";

export default function NotFoundIllustration({ width = 250, height = 250 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="47"
        fill="#e0e7ff"
        stroke="#c7d2fe"
        strokeWidth="1"
      />
      <G transform="translate(25, 25)">
        <Circle
          cx="25"
          cy="25"
          r="20"
          fill="white"
          stroke="#c7d2fe"
          strokeWidth="1"
        />
        <Path
          d="M15,15 L35,35"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path
          d="M35,15 L15,35"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path
          d="M20,40 Q25,45 30,40"
          stroke="#4b5563"
          strokeWidth="1.5"
          fill="none"
        />
      </G>
      <Path
        d="M30,80 L70,80"
        stroke="#c7d2fe"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M40,85 L60,85"
        stroke="#c7d2fe"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </Svg>
  );
}
