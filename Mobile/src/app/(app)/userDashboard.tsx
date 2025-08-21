import dashboardTopSectionView from "@/src/components/dashboard/dashboardTopSectionView";
import dashboardBottomSectionView from "@/src/components/dashboard/ListView";
import Sidebar from "@/src/components/dashboard/sidebar";
import { dashboardTopSection } from "@/src/helpers/dummyDatas/dashboardData";
import { dashboardBottomSection } from "@/src/helpers/dummyDatas/ListViewData";
import React from "react";
import { FlatList, View } from "react-native";
import MainLayout from "../../components/MainLayout";

const UserDashboard = () => {
  return (
    <MainLayout
      topSection={<Sidebar />}
      bottomSection={
        <View className="flex h-full w-full rounded-t-[2rem]">
          {/* this is the grid layout */}
          <View className="flex-1">
            <FlatList
              data={dashboardTopSection}
              keyExtractor={(item) => item.id.toString()}
              renderItem={dashboardTopSectionView}
              numColumns={2}
              columnWrapperStyle={{ gap: 12 }} //horizontal gap
              contentContainerStyle={{
                gap: 12, // vertical gap
              }}

              // didn't work
              // columnWrapperStyle={{
              //   justifyContent: "space-between",
              // marginBottom: 2, // Vertical gap between rows
              // }}
              // style={{ gap: 12 }}
            />
          </View>

          {/* this is the list layout */}
          <View className="flex-1 pt-4">
            <FlatList
              // className="bg-red-500"
              contentContainerStyle={{
                gap: 12, // vertical gap
              }}
              data={dashboardBottomSection}
              keyExtractor={(item) => item.id.toString()}
              renderItem={dashboardBottomSectionView}
              // ItemSeparatorComponent={flatListItemSeperator} //didn't work
            />
          </View>
        </View>
      }
    />
  );
};

// const styles = StyleSheet.create({
//   flatListContainer: {
//     gap: 2,
//   },
// });

export default UserDashboard;
