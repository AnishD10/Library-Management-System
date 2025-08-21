import { AppDispatch } from "@/src/app/store";
import { useAuth } from "@/src/Context/AuthContext";
import { resetData } from "@/src/features/userSlice";
import { deleteUserData } from "@/src/helpers/storage";
import { IDashboardSidebar } from "@/src/interfaces";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export const SidebarFlatlist = ({
  item,
  dispatch,
}: {
  item: IDashboardSidebar;
  dispatch: AppDispatch;
}) => {
  const { checkAuth } = useAuth();

  return (
    <>
      {item.title !== "Log Out" ? (
        <View
          className="flex-row flex-1 items-center justify-between px-4"
          // style={
          //   Platform.OS === "ios"
          //     ? {
          //         shadowColor: "#000",
          //         shadowOffset: { width: 0, height: 0.5 },
          //         shadowOpacity: 0.5,
          //         shadowRadius: 0.5,
          //       }
          //     : { elevation: 1 }
          // }
        >
          <Link href={item.link} className="flex-row">
            <View className="flex-row items-center gap-4 flex-1">
              <FontAwesomeIcon color="#212121" icon={item.faIcon} />
              <Text className="text-textPrimary text-xl">{item.title}</Text>
            </View>
          </Link>
          <FontAwesomeIcon
            style={{ flex: 1 }}
            color="#212121"
            icon={faChevronRight}
          />
        </View>
      ) : (
        <View className="flex-row flex-1 items-center justify-between px-4 pr-8">
          <TouchableOpacity
            onPress={() => {
              deleteUserData();
              dispatch(resetData());
              // navigate("/(auth)/signIn");
              checkAuth();
            }}
            className="flex-row"
          >
            <View className="flex-row items-center gap-4 flex-1">
              <FontAwesomeIcon color="#212121" icon={item.faIcon} />
              <Text className="text-textPrimary text-xl">{item.title}</Text>
            </View>
          </TouchableOpacity>
          <FontAwesomeIcon
            style={{ flex: 1 }}
            color="#212121"
            icon={faChevronRight}
          />
        </View>
      )}
    </>
  );
};
