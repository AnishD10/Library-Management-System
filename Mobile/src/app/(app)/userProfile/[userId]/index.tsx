import UserProfileHeader from "@/src/components/header/userProfileHeader";
import MainLayout from "@/src/components/MainLayout";
import UserGraph from "@/src/components/userProfile/userGraph";
import React from "react";

const UserProfile = () => {
  return (
    <MainLayout
      topSection={<UserProfileHeader />}
      bottomSection={<UserGraph />}
    />
  );
};

export default UserProfile;
