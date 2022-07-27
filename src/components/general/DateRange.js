import { useCallback, useState } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

const DateRange = (props) => {

    const {startDate, endDate, minDate, onDateRangeChange} = props;
    const [focusedDatePickerInput, setFocusedDatePickerInput] = useState();

    console.log(startDate);
    console.log(endDate);

    const handleDateRangeChange = useCallback((startDate, endDate) => {
        console.log("Date range changed");
        onDateRangeChange(startDate, endDate);
    });


    return ( 
        <DateRangePicker
            startDate={moment(startDate)}
            startDateId='start-date-id'
            endDate={moment(endDate)}
            endDateId='end-date-id'
            onDatesChange={handleDateRangeChange} // PropTypes.func.isRequired,
            focusedInput={focusedDatePickerInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => setFocusedDatePickerInput(focusedInput)} // PropTypes.func.isRequired,
            displayFormat='DD.MM.yyyy'
            showDefaultInputIcon
            minDate={moment(minDate)}
        />
    )
}

export default DateRange;