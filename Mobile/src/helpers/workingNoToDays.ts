export const workingNoToDays = (workingDays: number[]) => {
  const convertedDays = workingDays.map((day) => {
    switch (day) {
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      case 7:
        return "Sun";
      default:
        break;
    }
  });

  // console.log("Array: ", convertedDays);

  return convertedDays;
};
