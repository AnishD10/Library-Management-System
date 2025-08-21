import React from "react";
// import { default as Picker } from "react-native-picker-select";
// import { Picker } from "@react-native-picker/picker";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch } from "react-redux";
import { updatedForm } from "../features/employeeSlice/employeeSlice";
import { IRNSelectItem } from "../interfaces";

export const pickerSelectStyles = {
  inputIOS: {
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgb(156 163 175)",
    borderRadius: 8,
    color: "#757575",
    paddingRight: 30, // ensure space for dropdown icon
  },
  inputAndroid: {
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgb(156 163 175)",
    borderRadius: 8,
    color: "#757575",
    paddingRight: 30, // ensure space for dropdown icon
  },
  placeholder: {
    color: "#757575",
  },
  iconContainer: {
    top: 16,
    right: 12,
  },
};

const SoraRNSelect = ({
  items,
  selectedValue,
  field,
}: {
  items: IRNSelectItem[];
  selectedValue: string;
  field: string;
}) => {
  // const [selectedValue, setSelectedValue] = useState<string>("");

  const dispatch = useDispatch();

  return (
    <>
      <RNPickerSelect
        onValueChange={(value) =>
          dispatch(updatedForm({ field: field, value: value }))
        }
        items={items}
        style={pickerSelectStyles}
        value={selectedValue}
        placeholder={{}}
        useNativeAndroidPickerStyle={false}
        Icon={() => <FontAwesomeIcon icon={faChevronDown} color="#757575" />}
      />

      {/* <RNPickerSelect
        //   style={{height: 20, width:}}
        style={pickerSelectStyles}
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
        ]}
      /> */}
      {/* <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="Python" value="python" />
      </Picker> */}
    </>
  );
};

export default SoraRNSelect;
