import { useCallback, useState } from 'react';
import { useTranslation } from "react-i18next";
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

const DateRange = (props) => {

    const {startDate, endDate, minDate, onDateRangeChange} = props;
    const [focusedDatePickerInput, setFocusedDatePickerInput] = useState();
    const { t } = useTranslation();


    const handleDateRangeChange = useCallback((startDate, endDate) => {
        onDateRangeChange(startDate, endDate);
    });

    const isOutsideRange = (day) => {
        day.isAfter(moment()) || day.isBefore(moment('1.1.1993'));
    };


    return ( 
        <DateRangePicker
            startDate={!!startDate ? moment(startDate) : undefined}
            startDateId='start-date-id'
            endDate={!!endDate ? moment(endDate) : undefined}
            endDateId='end-date-id'
            required={false}
            onDatesChange={handleDateRangeChange} // PropTypes.func.isRequired,
            focusedInput={focusedDatePickerInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => setFocusedDatePickerInput(focusedInput)} // PropTypes.func.isRequired,
            startDatePlaceholderText={t('general.date_range.start_date')}
            endDatePlaceholderText={t('general.date_range.end_date')}
            showDefaultInputIcon
            isOutsideRange={isOutsideRange}
        />
    )
}

export default DateRange;