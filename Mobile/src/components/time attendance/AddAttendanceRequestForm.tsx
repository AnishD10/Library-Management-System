import { RootState } from "@/src/app/store";
import { updatedAttendanceForm } from "@/src/features/requestSlice/attendanceRequestSlice";
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
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const AddAttendanceRequestForm = (props: Props) => {
  const dispatch = useDispatch();
  const { date, inTime, outTime, reason, employeeId } = useSelector(
    (state: RootState) => state.attendanceForm
  );

  const [openDate, setOpenDate] = useState<boolean>(false);
  const [openInTime, setOpenInTime] = useState<boolean>(false);
  const [openOutTime, setOpenOutTime] = useState<boolean>(false);

  const onChangeDate = (event, selectedDate) => {
    Platform.OS === "android" && setOpenDate(false);

    dispatch(
      updatedAttendanceForm({ field: "date", value: Date.parse(selectedDate) })
    );
  };

  const onChangeInTime = (event, selectedDate) => {
    Platform.OS === "android" && setOpenInTime(false);

    dispatch(
      updatedAttendanceForm({
        field: "inTime",
        value: Date.parse(selectedDate),
      })
    );
  };

  const onChangeOutTime = (event, selectedDate) => {
    Platform.OS === "android" && setOpenInTime(false);

    dispatch(
      updatedAttendanceForm({
        field: "outTime",
        value: Date.parse(selectedDate),
      })
    );
  };

  const handleAddAttendance = async () => {
    // testing
    // console.log("Delulu!");
    // const employeeID = await getEmployeeId();
    // console.log("EmployeeID: ", employeeID);

    console.log(date, inTime, outTime, reason, employeeId);
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView className="h-full w-full">
        <View className="flex-1 gap-4">
          <View className="gap-1">
            <Text className="text-textPrimary">Date</Text>
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
            <Text className="text-textPrimary">In Time</Text>
            <TouchableOpacity
              onPress={() => setOpenInTime(true)}
              className="border h-16 rounded-lg justify-center border-gray-400 px-2"
            >
              <Text className="text-[#757575]">
                {new Date(inTime).toLocaleTimeString()}
              </Text>
            </TouchableOpacity>

            {openInTime && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(inTime)}
                mode={"time"}
                is24Hour={true}
                onChange={onChangeInTime}
              />
            )}
          </View>

          <View className="gap-1">
            <Text className="text-textPrimary">Out Time</Text>
            <TouchableOpacity
              onPress={() => setOpenOutTime(true)}
              className="border h-16 rounded-lg justify-center border-gray-400 px-2"
            >
              <Text className="text-[#757575]">
                {new Date(outTime).toLocaleTimeString()}
              </Text>
            </TouchableOpacity>

            {openOutTime && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(outTime)}
                mode={"time"}
                is24Hour={true}
                onChange={onChangeOutTime}
              />
            )}
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
                dispatch(
                  updatedAttendanceForm({ field: "reason", value: text })
                )
              }
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              handleAddAttendance();
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

export default AddAttendanceRequestForm;
