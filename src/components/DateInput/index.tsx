import React, {useState} from 'react';
import {fetchDataSelector, fetchRangeDataSelector, isLoadingSelector, useAppStore} from '../../store/app';
import {transformDateForQuery, utcTimeNow} from '../../utils/utils';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import './dateInput.css'

export const DateInput = () => {

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const fetchOneData = useAppStore(fetchDataSelector)
    const fetchData = useAppStore(fetchRangeDataSelector)
    const isLoading = useAppStore(isLoadingSelector)

    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const searchDate = () => {
        if (startDate && endDate) {
            fetchData(transformDateForQuery(startDate), transformDateForQuery(endDate))
        }
        if (startDate && !endDate) {
            fetchData(transformDateForQuery(startDate), transformDateForQuery(startDate))
        }
        if (!startDate && !endDate) {
            fetchOneData()
        }
    }

    return <div className={'date'}>
        <span>Range date:</span> <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        onCalendarClose={searchDate}
        showIcon
        showYearDropdown
        showMonthDropdown
        selectsRange
        placeholderText={transformDateForQuery(utcTimeNow())}
        dropdownMode={'select'}
        minDate={new Date(1995, 5, 16)}
        maxDate={utcTimeNow()}
        withPortal
        disabled={isLoading}/>
    </div>
}
