import ImageIcon from "@/assets/images/undraw_image.png";
import Avatar from "@/assets/svgs/undraw_avatar.svg";
import { RootState } from "@/src/app/store";
import SoraRNMultiSelect from "@/src/elements/soraRNMultiSelect";
import SoraRNSelect from "@/src/elements/soraRNSelect";
import { updatedForm } from "@/src/features/employeeSlice/employeeSlice";
import {
  departmentOptions,
  designationOptions,
  genderOptions,
} from "@/src/helpers/dummyDatas/selectData";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { workingDaysOptionsMulti } from "../../helpers/dummyDatas/multiSelectData";

const AddEmployeeForm = () => {
  const dispatch = useDispatch();
  const {
    profilePhoto,
    joiningDate,
    employeeId,
    fullName,
    mobileNumber,
    designation,
    workingDays,
    basicPay,
    perDay,
    gender,
    department,
  } = useSelector((state: RootState) => state.employeeForm);

  const [openDate, setOpenDate] = useState<boolean>(false); //use if needed

  const onChangeDT = (event, selectedDate: Date) => {
    const currentDate = selectedDate;
    const parsedDate = Date.parse(currentDate);
    dispatch(updatedForm({ field: "joiningDate", value: parsedDate }));
    {
      Platform.OS === "android" && setOpenDate(false);
    }
  };

  const imagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "livePhotos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Result: ", result);

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      dispatch(
        updatedForm({ field: "profilePhoto", value: result.assets[0].uri })
      );
    }
  };

  const handlePayToggle = () => {
    dispatch(updatedForm({ field: "perDay", value: !perDay }));
  };

  // test only
  // const currentState = JSON.stringify({
  //   profilePhoto,
  //   joiningDate,
  //   employeeId,
  //   fullName,
  //   mobileNumber,
  //   designation,
  //   workingDays,
  //   basicPay,
  //   perDay,
  //   gender,
  //   department,
  // });

  const [error, setError] = useState({
    joiningDate: "",
    employeeId: "",
    fullName: "",
    mobileNumber: "",
    designation: "",
    workingDays: "",
    basicPay: "",
    gender: "",
    department: "",
  });

  const isValidForm = () => {
    let valid = true;
    const newErrors = {
      joiningDate: "",
      employeeId: "",
      fullName: "",
      mobileNumber: "",
      designation: "",
      workingDays: "",
      basicPay: "",
      gender: "",
      department: "",
    };

    if (joiningDate === 1738051730000 || joiningDate === null) {
      newErrors.joiningDate = "Joining Date is Required!";
      valid = false;
    } else {
      newErrors.joiningDate = "";
    }

    return valid;
  };

  const handleSave = () => {
    if (isValidForm()) {
      console.log("Current State: ", {
        profilePhoto,
        joiningDate,
        employeeId,
        fullName,
        mobileNumber,
        designation,
        workingDays,
        basicPay,
        perDay,
        gender,
        department,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 h-full w-full flex-row">
          <View className="flex-1 justify-center">
            <TouchableHighlight
              onPress={imagePicker}
              className="h-36 w-36 relative rounded-full border-2 border-secondary justify-center items-center"
            >
              {/* <View className=""> */}
              {profilePhoto ? (
                <Image
                  className="h-full w-full bg-cover rounded-full"
                  source={{ uri: profilePhoto }}
                />
              ) : (
                <Avatar height={122} />
              )}
              {/* </View> */}
            </TouchableHighlight>
            {/* <View > */}
            <Image
              className="absolute h-12 w-12 rounded-full right-14 bottom-8 border-2 border-white z-50"
              source={ImageIcon}
            />
            {/* </View> */}
          </View>

          <View className="flex-1 py-4 gap-4">
            <View className="gap-1">
              <Text>Joining Date</Text>
              <TouchableOpacity
                // keyboardType="numbers-and-punctuation"
                className="border h-16 rounded-lg border-gray-400 px-2 justify-center"
                onPress={() => setOpenDate(true)}
              >
                <Text className="text-[#757575]">
                  {new Date(joiningDate).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              {openDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date(joiningDate)}
                  mode={"date"}
                  is24Hour={true}
                  onChange={onChangeDT}
                />
              )}
              {/* <TextInput
              keyboardType="number-pad"
              className="border h-16 rounded-lg border-gray-400"
            /> */}
            </View>

            <View className="gap-1">
              <Text>Employee ID</Text>
              <TextInput
                placeholder="Saha123"
                placeholderTextColor="#757575"
                // keyboardType="number-pad"
                className="border h-16 rounded-lg border-gray-400 px-2"
                value={employeeId}
                onChangeText={(text) =>
                  dispatch(updatedForm({ field: "employeeId", value: text }))
                }
              />
            </View>
          </View>
        </View>

        <View className="flex-[3] h-full w-full gap-4 pt-2">
          <View className="gap-1">
            <Text>Full Name</Text>
            <TextInput
              placeholder="John Doe"
              placeholderTextColor="#757575"
              className="border h-16 rounded-lg border-gray-400 px-2"
              value={fullName}
              onChangeText={(text) =>
                dispatch(updatedForm({ field: "fullName", value: text }))
              }
            />
          </View>

          <View className="gap-1">
            <Text>Mobile Number</Text>
            <TextInput
              keyboardType="number-pad"
              className="border h-16 rounded-lg border-gray-400 px-2"
              placeholder="+977 9803212312"
              placeholderTextColor="#757575"
              value={mobileNumber}
              onChangeText={(moNo) =>
                dispatch(updatedForm({ field: "mobileNumber", value: moNo }))
              }
            />
          </View>

          <View className="gap-1">
            <Text>Designation</Text>
            <SoraRNSelect
              items={designationOptions}
              selectedValue={designation}
              field="designation"
            />
          </View>

          <View className="gap-1">
            <Text>Working Day</Text>
            {/* <SoraRNSelect
              items={workingDaysOptions}
              selectedValue={workingDays}
              field="workingDays"
            /> */}
            <SoraRNMultiSelect
              items={workingDaysOptionsMulti}
              field="workingDays"
              selectedItems={workingDays}
            />
          </View>

          <View className="gap-1">
            <Text>Basic Pay</Text>
            <View className="flex-row gap-2">
              <TextInput
                keyboardType="numeric"
                placeholder="80000"
                placeholderTextColor="#757575"
                className="border h-16 rounded-lg border-gray-400 px-2 flex-[2]"
                value={basicPay.toString()}
                onChangeText={(bp) =>
                  dispatch(updatedForm({ field: "basicPay", value: bp }))
                }
              />
              <TouchableHighlight
                className={`flex-1 px-2 h-16 ${perDay ? "bg-primary" : "bg-white"} rounded-lg items-center justify-center border border-primary`}
                underlayColor="#5e6bb7"
                onPress={handlePayToggle}
              >
                <Text
                  className={`${!perDay ? "text-primary" : "text-white"} font-bold`}
                >
                  Per Day
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                className={`flex-1 px-2 h-16 ${perDay ? "bg-white" : "bg-primary"} rounded-lg items-center justify-center border border-primary`}
                underlayColor="#5e6bb7"
                onPress={handlePayToggle}
              >
                <Text
                  className={`${perDay ? "text-primary" : "text-white"} font-bold`}
                >
                  Monthly
                </Text>
              </TouchableHighlight>
            </View>
          </View>

          <View className="gap-1">
            <Text>Gender</Text>
            <SoraRNSelect
              items={genderOptions}
              selectedValue={gender}
              field="gender"
            />
          </View>

          <View className="gap-1">
            <Text>Add Department</Text>
            <SoraRNSelect
              items={departmentOptions}
              selectedValue={department}
              field="department"
            />
          </View>

          <TouchableHighlight
            className={`flex-1 px-2 h-16 bg-primary rounded-lg items-center justify-center border border-primary`}
            underlayColor="#5e6bb7"
            onPress={handleSave}
          >
            <Text className={`text-white font-bold`}>Save</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddEmployeeForm;
