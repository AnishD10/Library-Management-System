import { AppDispatch, RootState } from "@/src/app/store";
import { useAuth } from "@/src/Context/AuthContext";
import { updatedSignInForm } from "@/src/features/authSlice/signinSlice";
import { signInUserThunk } from "@/src/features/userSlice";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const SignInForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { checkAuth } = useAuth();
  const { username, password, saveMe } = useSelector(
    (state: RootState) => state.signInForm
  );

  const [error, setError] = useState({
    username: "",
    password: "",
  });

  const isValidForm = () => {
    let valid = true;

    if (username === "" || username === null) {
      valid = false;
      setError((prev) => ({ ...prev, username: "Username is required!" }));
    } else {
      setError((prev) => ({ ...prev, username: "" }));
    }

    if (password === "" || password === null) {
      valid = false;
      setError((prev) => ({ ...prev, password: "Password is required!" }));
    } else {
      setError((prev) => ({ ...prev, password: "" }));
    }

    return valid;
  };

  const handleSignIn = async () => {
    if (isValidForm()) {
      try {
        // Use unwrap() to properly handle the promise
        const result = await dispatch(
          signInUserThunk({ username, password, saveMe })
        ).unwrap();

        // let's try different approach
        // const result = await signInService({ username, password, saveMe });
        console.log("Sign in successful:", result);
        checkAuth();
      } catch (error) {
        console.error("Sign in failed:", error);
        // Handle error (show alert, etc.)
      }
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1 pt-2 gap-4">
      <View className="gap-1">
        <Text className="text-textPrimary">
          Mobile Number / Email / Username
        </Text>
        <TextInput
          placeholder="9830136720"
          placeholderTextColor="#757575"
          // keyboardType="number-pad"
          className="border h-16 rounded-lg border-gray-400 px-2"
          value={username}
          onChangeText={(text) =>
            dispatch(updatedSignInForm({ field: "username", value: text }))
          }
        />
        {error.username !== "" && (
          <Text className="text-error">{error.username}</Text>
        )}
      </View>

      <View className="gap-1">
        <Text className="text-textPrimary">Password</Text>
        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#757575"
          secureTextEntry={true}
          // keyboardType="number-pad"
          className="border h-16 rounded-lg border-gray-400 px-2"
          value={password}
          onChangeText={(text) =>
            dispatch(updatedSignInForm({ field: "password", value: text }))
          }
        />
        {error.password !== "" && (
          <Text className="text-error">{error.password}</Text>
        )}
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Switch
            // style={{ transform: [{ scaleX: 0.4 }, { scaleY: 0.4 }] }}
            value={saveMe}
            onValueChange={() => {
              dispatch(updatedSignInForm({ field: "saveMe", value: !saveMe }));
            }}
          />
          <Text>Save Me</Text>
        </View>
        <Link href={"/forgetPassword"}>
          <Text>Forgot Password?</Text>
        </Link>
      </View>

      <TouchableOpacity
        className="p-5 bg-primary rounded-lg"
        onPress={handleSignIn}
      >
        <Text className="text-center text-white font-semibold text-xl">
          Sign In
        </Text>
      </TouchableOpacity>

      <Text className="text-center text-[#757575]">
        Not an Employee?{" "}
        <Link href="/signUp" className="text-primary">
          Sign Up
        </Link>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default SignInForm;
