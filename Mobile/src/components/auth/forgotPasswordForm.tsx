import { deleteUserTokenxWelcomeSeen } from "@/src/helpers/storage";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {};

const ForgotPasswordForm = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validForm = () => {
    let valid = false;

    if (email === null || email === "") {
      setError("Email is required!");
    } else if (!email.includes("@")) {
      setError("Enter a valid email!");
    } else {
      setError("");
      valid = true;
    }

    return valid;
  };

  const handleDelete = async () => {
    await deleteUserTokenxWelcomeSeen();
    Alert.alert("Data has been reset! You can now visit your welcome screen!");
  };

  const handleForgetPress = () => {
    if (validForm()) {
      Alert.alert(
        "Reset the values?",
        "Resetting this will enable you to visit the welcome screen once again!",
        [
          {
            text: "Delete",
            onPress: () => {
              handleDelete();
            },
            style: "destructive",
          },
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View className="gap-1 pt-2">
      <Text className="text-textPrimary">Email</Text>
      <TextInput
        placeholder="employee@gmail.com"
        placeholderTextColor="#757575"
        // secureTextEntry={true}
        // keyboardType="number-pad"
        className="border h-16 rounded-lg border-gray-400 px-2"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {(error || error !== "") && <Text className="text-error">{error}</Text>}
      <TouchableOpacity
        onPress={handleForgetPress}
        className="w-full p-5 mt-1 bg-primary rounded-lg"
      >
        <Text className="text-white text-center font-semibold text-xl">
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordForm;
