import { TouchableHighlight } from "react-native";
import { ISoraTouchableHighlightsProps } from "../interfaces";

const SoraTouchableHighlight = ({
  children,
  onPress,
  className,
  style,
}: ISoraTouchableHighlightsProps) => {
  return (
    <TouchableHighlight
      underlayColor="#5e6bb7"
      onPress={onPress}
      style={[
        {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        },
        style, // user's style will override defaults if there are conflicts
      ]}
      className={`h-12 w-12 rounded-xl items-center justify-center${className ? ` ${className}` : ""}`}
    >
      {children}
    </TouchableHighlight>
  );
};

export default SoraTouchableHighlight;
