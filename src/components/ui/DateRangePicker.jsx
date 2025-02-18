import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePicker = ({ state, setState }) => {
  return (
    <DateRange
      editableDateInputs={true}
      onChange={(item) => {
        setState([item.selection]);
      }}
      moveRangeOnFirstSelection={false}
      ranges={state}
    />
  );
};

export default DateRangePicker;
