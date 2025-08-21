// import SoraTouchableHighlight from "@/src/elements/soraTouchableHighlights";
import { ICommonHeaderItem } from "@/src/interfaces";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "expo-router";
import { ReactNode } from "react";
import { Text, View } from "react-native";
const commonHeader = ({
  item,
  element,
}: {
  item: ICommonHeaderItem;
  element?: ReactNode;
}) => {
  return (
    <View className="h-full w-full flex-row px-6 py-4">
      <View className="flex-[4] gap-2 justify-center">
        <View className="flex-row gap-2 items-center">
          <Link href={item.link}>
            {/* <SoraTouchableHighlight onPress={() => router.back()}> */}
            <FontAwesomeIcon color="white" size={20} icon={faArrowLeft} />
            {/* </SoraTouchableHighlight> */}
          </Link>
          <Text className="font-bold text-2xl text-white">{item.title}</Text>
        </View>
        {item.desc && <Text className="text-white">{item.desc}</Text>}
      </View>
      <View>{element && element}</View>
    </View>
  );
};

export default commonHeader;
