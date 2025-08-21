import { IWelcomeScreenData } from "@/src/interfaces/welcomeData";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  // Dimensions,
  ImageBackground,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

// const { width } = Dimensions.get("window");

const index = ({
  item,
  onDone,
  handleNext,
  currentIndex,
}: {
  item: IWelcomeScreenData;
  onDone: () => void;
  handleNext: () => void;
  currentIndex: number;
}) => {
  return (
    <View>
      <View className="h-[50%] bg-slate-100 relative">
        <ImageBackground
          className="h-full bg-cover"
          source={item.bgImg}
          alt="firstImage"
        />
        {/* <Img1 /> */}
        {/* <SvgXml xml={Img1} width={200} height={200} /> */}
        {item.id !== 3 && (
          <TouchableHighlight
            className="absolute right-6 top-6 p-2 rounded-md"
            onPress={onDone}
            activeOpacity={0.8}
            underlayColor="#009688"
          >
            <Text className="font-semibold text-[1.3rem] text-primary">
              Skip
            </Text>
          </TouchableHighlight>
        )}
      </View>
      <View className="h-[50%] bg-slate-50 rounded-t-[32px] justify-between px-8 py-10 relative">
        <View className="">
          <Text className="text-primary font-bold text-[2.5rem]">
            {item.title1}
          </Text>
          <Text className="text-primary font-bold text-[2.5rem]">
            {item.title2}
          </Text>
          <Text className="mt-4 text-lg">{item.description}</Text>
        </View>
        <View className="w-full flex-row justify-between items-center">
          <View className="flex-row gap-1 items-center">
            <View
              className={`${currentIndex === 1 ? "w-9 bg-primary" : "w-3 bg-gray-300"} h-2 rounded-full`}
            >
              <Text></Text>
            </View>
            <View
              className={`${currentIndex === 2 ? "w-9 bg-primary" : "w-3 bg-gray-300"} h-2 rounded-full`}
            >
              <Text></Text>
            </View>
            <View
              className={`${currentIndex === 3 ? "w-9 bg-primary" : "w-3 bg-gray-300"} h-2 rounded-full`}
            >
              <Text></Text>
            </View>
          </View>
          <TouchableHighlight
            className="h-20 w-20 rounded-full bg-primary items-center justify-center"
            onPress={handleNext}
          >
            {/* <Text className="text-white font-bold text-2xl"> */}
            <FontAwesomeIcon color="white" icon={faChevronRight} />
            {/* </Text> */}
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default index;
