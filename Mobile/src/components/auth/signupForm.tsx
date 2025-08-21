import { AppDispatch, RootState } from "@/src/app/store";
import { updatedSignUpForm } from "@/src/features/authSlice/signupSlice";
import { signUpUserThunk } from "@/src/features/userSlice";
import { Link, useNavigation } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const SignUpForm = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const { username, email, mobileNo, password, confirmPassword } = useSelector(
    (state: RootState) => state.signUpForm
  );

  const [error, setError] = useState({
    username: "",
    mobileNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    notSame: "",
  });

  const isValidForm = () => {
    let valid = true;
    const newErrors = {
      username: "",
      mobileNo: "",
      email: "",
      password: "",
      confirmPassword: "",
      notSame: "",
    };

    if (username === "" || username === null) {
      valid = false;
      newErrors.username = "Username is required!";
    } else {
      newErrors.username = "";
    }

    if (mobileNo === "" || mobileNo === null) {
      valid = false;
      newErrors.mobileNo = "Mobile number is required!";
    } else {
      newErrors.mobileNo = "";
    }

    if (email === "" || email === null) {
      valid = false;
      newErrors.email = "Email is required!";
    } else {
      newErrors.email = "";
    }

    if (password === "" || password === null) {
      valid = false;
      newErrors.password = "Password is required!";
    } else {
      newErrors.password = "";
    }

    if (confirmPassword === "" || confirmPassword === null) {
      valid = false;
      newErrors.confirmPassword = "Confirm Password is required!";
    } else {
      newErrors.confirmPassword = "";
    }

    if (
      password !== null &&
      confirmPassword !== null &&
      password !== confirmPassword
    ) {
      valid = false;
      newErrors.notSame = "Password and Confirm Password must match!";
    } else {
      newErrors.notSame = "";
    }

    setError(newErrors);

    return valid;
  };

  const handleSignUp = async () => {
    if (isValidForm()) {
      try {
        const response = await dispatch(
          signUpUserThunk({
            username,
            email,
            mobileNo,
            password,
            confirmPassword,
          })
        ).unwrap();
        console.log("Response:", response);
        navigation.navigate("signIn");
      } catch (err) {
        console.log("Error signing up: ", err);
      }
    }
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   className="flex-1"
    // >
    <View className="flex-1 pt-2 gap-4">
      <View className="gap-1">
        <Text className="text-textPrimary">Username</Text>
        <TextInput
          placeholder="Hoza48"
          placeholderTextColor="#757575"
          // keyboardType="number-pad"
          className="border h-16 rounded-lg border-gray-400 px-2"
          value={username}
          onChangeText={(text) =>
            dispatch(updatedSignUpForm({ field: "username", value: text }))
          }
        />
        {error.username && <Text className="text-error">{error.username}</Text>}
      </View>

      <View className="gap-1">
        <Text className="text-textPrimary">Mobile Number</Text>
        <TextInput
          placeholder="+977 9830136720"
          placeholderTextColor="#757575"
          keyboardType="number-pad"
          className="border h-16 rounded-lg border-gray-400 px-2"
          value={mobileNo}
          onChangeText={(text) =>
            dispatch(updatedSignUpForm({ field: "mobileNo", value: text }))
          }
        />
        {error.mobileNo && <Text className="text-error">{error.mobileNo}</Text>}
      </View>

      <View className="gap-1">
        <Text className="text-textPrimary">Email</Text>
        <TextInput
          placeholder="admin@gmail.com"
          placeholderTextColor="#757575"
          // keyboardType="number-pad"
          className="border h-16 rounded-lg border-gray-400 px-2"
          value={email}
          onChangeText={(text) =>
            dispatch(updatedSignUpForm({ field: "email", value: text }))
          }
        />
        {error.email && <Text className="text-error">{error.email}</Text>}
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
            dispatch(updatedSignUpForm({ field: "password", value: text }))
          }
        />
        {(error.password || error.notSame) && (
          <Text className="text-error">
            {error.password !== "" ? error.password : error.notSame}
          </Text>
        )}
      </View>

      <View className="gap-1">
        <Text className="text-textPrimary">Confirm Password</Text>
        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#757575"
          secureTextEntry={true}
          // keyboardType="number-pad"
          className="border h-16 rounded-lg border-gray-400 px-2"
          value={confirmPassword}
          onChangeText={(text) =>
            dispatch(
              updatedSignUpForm({ field: "confirmPassword", value: text })
            )
          }
        />
        {error.confirmPassword && (
          <Text className="text-error">{error.confirmPassword}</Text>
        )}
      </View>

      <TouchableOpacity
        className="p-5 bg-primary rounded-lg"
        onPress={handleSignUp}
      >
        <Text className="text-center text-white font-semibold text-xl">
          Sign Up
        </Text>
      </TouchableOpacity>
      <Text className="text-center text-[#757575]">
        Not an Business Owner / Admin / HR?{" "}
        <Link href="/signIn" className="text-primary">
          Sign In
        </Link>
      </Text>
    </View>
    // </KeyboardAvoidingView>
  );
};

export default SignUpForm;
