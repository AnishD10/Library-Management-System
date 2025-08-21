import { ScrollView } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { useDispatch } from "react-redux";
import { updatedForm } from "../features/employeeSlice/employeeSlice";

const SoraRNMultiSelect = ({
  field,
  selectedItems,
  items,
}: {
  field: string;
  selectedItems: any;
  items: any;
}) => {
  // const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const dispatch = useDispatch();

  const onSelectedItemsChange = (selectedItem: any) => {
    console.log("Selected Items: ", selectedItem);
    // setSelectedItem(selectedItem);
    console.log("Actually Selected Item: ", selectedItems);

    dispatch(updatedForm({ field: field, value: selectedItem }));

    // Get full selected objects
    // const fullSelectedItems = transformedOptions.filter((item) =>
    //   selectedIds.includes(item.id)
    // );

    // console.log("Full Selected Items: ", fullSelectedItems);
    // setSelectedItems(selectedIds);
  };

  return (
    <ScrollView horizontal={true}>
      <MultiSelect
        hideTags
        items={items}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        uniqueKey="id"
        selectText="Working Days"
        altFontFamily="ProximaNova-Light"
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="label"
        submitButtonColor="#CCC"
        submitButtonText="Submit"
        hideSubmitButton
        searchInputPlaceholderText=""
        searchInputStyle={{ display: "none" }} // Optionally hide search input
        // does not work as expected
        // styleMainWrapper={{ backgroundColor: "#f0f0f0" }} // Change background color here
      />
    </ScrollView>
    // <MultiSelect
    //   hideTags={true}
    //   items={workingDaysOptionsMulti}
    //   hideSubmitButton={true}
    //   uniqueKey="id"
    //   onSelectedItemsChange={(selectedItem) => {
    //     setSelectedItem(selectedItem);
    //   }}
    //   selectedItems={selectedItem}
    //   selectText="Pick Working Days"
    //   searchInputPlaceholderText="Search Items..."
    //   altFontFamily="Montserrat-Medium"
    //   itemFontFamily="Montserrat-Regular"
    //   // itemFontSize={responsiveFontSize(1.75)}
    //   selectedItemFontFamily="Montserrat-Regular"
    //   tagRemoveIconColor="#CCC"
    //   tagBorderColor="#CCC"
    //   tagTextColor="#CCC"
    //   selectedItemTextColor="#79AC78"
    //   selectedItemIconColor="#79AC78"
    //   itemTextColor="#000"
    //   displayKey="name"
    //   searchInputStyle={{ color: "#CCC" }}
    // />
  );
};

export default SoraRNMultiSelect;
