// import SoraTouchableHighlight from "@/src/elements/soraTouchableHighlights";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
const UserProfileHeader = () => {
  return (
    <View className="h-full w-full flex-row px-6 py-4">
      <View className="flex-[4] gap-2 justify-center">
        <View className="flex-row gap-2 items-center">
          <Link href={"/viewEmployee"}>
            {/* <SoraTouchableHighlight onPress={() => router.back()}> */}
            <FontAwesomeIcon color="white" size={20} icon={faArrowLeft} />
            {/* </SoraTouchableHighlight> */}
          </Link>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/2.jpg" }}
          />
          <Text className="font-bold text-2xl text-white">Shaidul Islam</Text>
        </View>
        <Text className="text-white">Designer</Text>
      </View>
      {/* <View>{element && element}</View> */}
    </View>
  );
};

export default UserProfileHeader;
