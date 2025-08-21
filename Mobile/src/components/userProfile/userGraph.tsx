import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

type Props = {};

const UserGraph = (props: Props) => {
  // Sample data - replace with actual employee hours
  const weeklyHours = [
    { value: 8, label: "M" }, // Monday
    { value: 7.5, label: "T" }, // Tuesday
    { value: 8.2, label: "W" }, // Wednesday
    { value: 6.5, label: "Th" }, // Thursday
    { value: 8, label: "F" }, // Friday
    { value: 4, label: "S" }, // Saturday
    { value: 0, label: "Su" }, // Sunday
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Working Hours</Text>

      <BarChart
        data={weeklyHours}
        barWidth={22}
        spacing={18}
        // roundedTop
        roundedBottom={false}
        frontColor="royalblue" // Bar color
        xAxisLabelTextStyle={styles.axisLabel} // Day labels
        yAxisTextStyle={styles.axisLabel} // Hour labels
        yAxisOffset={0}
        noOfSections={5}
        maxValue={10}
        width={300}
        // showLine
        lineConfig={{
          color: "lightgray",
          thickness: 1,
          // dashed: true,
          // dashWidth: 4,
        }}
        rulesColor="lightgray"
        rulesType="dashed"
        dashGap={4}
        showReferenceLine1
        referenceLine1Position={8}
        referenceLine1Config={{
          color: "tomato",
          dashWidth: 2,
          dashGap: 3,
          labelText: "Target",
          labelTextStyle: { color: "tomato" },
        }}
        renderTooltip={(item: any) => (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>{item.value} hrs</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    // margin: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
    // width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "royalblue",
    textAlign: "center",
  },
  axisLabel: {
    color: "royalblue",
    fontSize: 12,
  },
  tooltip: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  tooltipText: {
    color: "white",
    fontSize: 12,
  },
});

export default UserGraph;
