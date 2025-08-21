import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { RelativePathString } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import { TouchableHighlight } from "react-native";

const SoraAddButton = ({ navigateTo }: { navigateTo: RelativePathString }) => {
  return (
    <TouchableHighlight
      underlayColor={"#5e6bb7"}
      onPress={() => navigate(navigateTo)}
      className="absolute h-16 w-16 bg-primary justify-center items-center rounded-full right-8 bottom-8 border border-background"
    >
      <FontAwesomeIcon color="white" size={24} icon={faPlus} />
    </TouchableHighlight>
  );
};

export default SoraAddButton;
