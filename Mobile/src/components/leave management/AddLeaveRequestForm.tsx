import { RootState } from "@/src/app/store";
import { pickerSelectStyles } from "@/src/elements/soraRNSelect";
import { updatedLeaveForm } from "@/src/features/requestSlice/leaveRequestSlice";
import {
  leaveDurationOptions,
  leaveTypeOptions,
} from "@/src/helpers/dummyDatas/selectData";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const AddLeaveRequestForm = (props: Props) => {
  const dispatch = useDispatch();
  const { date, date2, reason, type, duration } = useSelector(
    (state: RootState) => state.leaveForm
  );
  const { employeeId } = useSelector((state: RootState) => state.userData);

  const [openDate, setOpenDate] = useState<boolean>(false);
  const [openDate2, setOpenDate2] = useState<boolean>(false);

  const onChangeDate = (event, selectedDate) => {
    Platform.OS === "android" && setOpenDate(false);

    dispatch(
      updatedLeaveForm({ field: "date", value: Date.parse(selectedDate) })
    );
  };

  const onChangeDate2 = (event, selectedDate) => {
    Platform.OS === "android" && setOpenDate2(false);

    dispatch(
      updatedLeaveForm({ field: "date2", value: Date.parse(selectedDate) })
    );
  };

  const handleAddLeave = async () => {
    console.log(date, date2, duration, type, reason, employeeId);
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView className="h-full w-full">
        <View className="flex-1 gap-4">
          <View className="gap-1">
            <Text className="text-textPrimary">Leave From</Text>
            <TouchableOpacity
              onPress={() => setOpenDate(true)}
              className="border h-16 rounded-lg justify-center border-gray-400 px-2"
            >
              <Text className="text-[#757575]">
                {new Date(date).toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {openDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(date)}
                mode={"date"}
                is24Hour={true}
                onChange={onChangeDate}
              />
            )}
          </View>

          <View className="gap-1">
            <Text className="text-textPrimary">Leave Till</Text>
            <TouchableOpacity
              onPress={() => setOpenDate2(true)}
              className="border h-16 rounded-lg justify-center border-gray-400 px-2"
            >
              <Text className="text-[#757575]">
                {new Date(date2).toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {openDate2 && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(date2)}
                mode={"date"}
                is24Hour={true}
                onChange={onChangeDate2}
              />
            )}
          </View>

          <View className="gap-1">
            <Text className="text-textPrimary">Type</Text>
            <RNPickerSelect
              onValueChange={(value) =>
                dispatch(updatedLeaveForm({ field: "type", value: value }))
              }
              items={leaveTypeOptions}
              style={pickerSelectStyles}
              value={type}
              placeholder={{}}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <FontAwesomeIcon icon={faChevronDown} color="#757575" />
              )}
            />
          </View>

          <View className="gap-1">
            <Text className="text-textPrimary">Duration</Text>
            <RNPickerSelect
              onValueChange={(value) =>
                dispatch(updatedLeaveForm({ field: "duration", value: value }))
              }
              items={leaveDurationOptions}
              style={pickerSelectStyles}
              value={duration}
              placeholder={{}}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <FontAwesomeIcon icon={faChevronDown} color="#757575" />
              )}
            />
          </View>

          <View className="gap-1">
            <Text className="text-textPrimary">Reason</Text>
            <TextInput
              placeholder="Over slept"
              placeholderTextColor="#757575"
              multiline={true}
              // secureTextEntry={true}
              // keyboardType="number-pad"
              className="border h-32 rounded-lg border-gray-400 px-2"
              value={reason}
              onChangeText={(text) =>
                dispatch(updatedLeaveForm({ field: "reason", value: text }))
              }
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              handleAddLeave();
            }}
            className="w-full p-5 mt-1 bg-primary rounded-lg"
          >
            <Text className="text-white text-center font-semibold text-xl">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddLeaveRequestForm;
