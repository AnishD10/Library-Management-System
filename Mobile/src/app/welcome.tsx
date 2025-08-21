import React, { useState } from "react";
import { View } from "react-native";
import { welcomeScreenData } from "../helpers/dummyDatas/welcomeData";
import Welcome from "../screens/welcome";
// import "./globals.css";

const WelcomeScreen = ({ onDone }: { onDone: () => void }) => {
  // const flatListRef = useRef(null);
  // const { width } = Dimensions.get("window");
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const handleNext = () => {
    if (currentIndex < welcomeScreenData.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      onDone();
    }
  };

  return (
    <View className="justify-center items-center bg-white">
      {/* <FlatList
        // className=""
        ref={flatListRef}
        data={welcomeScreenData}
        renderItem={({ item }) => (
          <Welcome item={item} onDone={onDone} handleNext={handleNext} />
        )}
        // horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      /> */}

      {welcomeScreenData
        .filter((item) => item.id === currentIndex)
        .map((item) => (
          <Welcome
            key={item.id}
            item={item}
            onDone={onDone}
            handleNext={handleNext}
            currentIndex={currentIndex}
          />
        ))}
    </View>
  );
};

export default WelcomeScreen;
