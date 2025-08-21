import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "expo-router";
import { Platform, Text, View } from "react-native";
import { IListViewItem } from "../../interfaces";

const ListView = ({ item }: { item: IListViewItem }) => {
  return (
    <Link href={item.link}>
      <View
        style={
          Platform.OS === "ios"
            ? {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.15,
                shadowRadius: 3,
                borderColor: item.color,
              }
            : {
                elevation: 2,
                borderColor: item.color,
              }
        }
        className="flex-row w-full items-center justify-between px-4 rounded-xl bg-white border-l-4"
      >
        <View className="flex-row items-center gap-4">
          {/* @ts-expect-error: <SVG /> */}
          <item.svg height={60} width={60} />
          <Text className="font-semibold text-primary text-lg">
            {item.title}
          </Text>
        </View>
        <FontAwesomeIcon icon={item.faIcon} color="#9ca3af" />
      </View>
    </Link>
  );
};

export default ListView;
