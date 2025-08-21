// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const setWelcomeSeen = async () => {
//   await AsyncStorage.setItem("hasSeenWelcome", "true");
// };

// export const hasSeenWelcome = async () => {
//   const value = await AsyncStorage.getItem("token");
//   return value === "true";
// };

import * as SecureStore from "expo-secure-store";

export const setWelcomeSeen = async () => {
  await SecureStore.setItemAsync("welcomeSeen", "true");
};

export const setEmployeeId = async () => {
  await SecureStore.setItemAsync("employeeId", "1");
};

export const getEmployeeId = async () => {
  const result = await SecureStore.getItemAsync("employeeId");
  return result ? result : 10;
};

export const getWelcomeSeen = async () => {
  const result = await SecureStore.getItemAsync("welcomeSeen");
  return result === "true";
};

export const getUserData = async () => {
  return await SecureStore.getItemAsync("userData");
};

export const setUserData = async (userData: any) => {
  return await SecureStore.setItemAsync("userData", userData);
};

export const deleteUserData = async () => {
  await SecureStore.deleteItemAsync("userData");
};

export const deleteUserTokenxWelcomeSeen = async () => {
  await SecureStore.deleteItemAsync("welcomeSeen");
  await SecureStore.deleteItemAsync("userToken");
};

export const save = async (key: string, value: any) => {
  await SecureStore.setItemAsync(key, value);
};

export const getValueFor = async (key: string) => {
  const result = await SecureStore.getItemAsync(key);
  console.log("The Result Saved Result is: " + result);
  return result;
};
