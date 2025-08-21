import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import SoraTouchableHighlight from "./soraTouchableHighlights";

type Props = {};

const SearchButtonWBar = (props: Props) => {
  const [openSearchBar, setOpenSearchBar] = useState<boolean>(false);
  const handleOpenSearchBar = () => {
    setOpenSearchBar(!openSearchBar);
  };

  return (
    <View className={`flex-1 justify-center items-center flex-row gap-2`}>
      {openSearchBar && (
        <View className="">
          <TextInput
            placeholder="Search"
            placeholderTextColor="#e0e0e0"
            className="border h-12 w-36 rounded-lg border-white px-2 color-white"
            // value={username}
            // onChangeText={(text) =>
            //   dispatch(updatedSignInForm({ field: "username", value: text }))
            // }
          />
        </View>
      )}

      <SoraTouchableHighlight
        onPress={handleOpenSearchBar}
        className="bg-slate-400"
      >
        <FontAwesomeIcon icon={faSearch} color="white" />
      </SoraTouchableHighlight>
    </View>
  );
};

export default SearchButtonWBar;
