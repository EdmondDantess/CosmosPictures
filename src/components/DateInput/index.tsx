import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './dateInput.css'
import {useAppStore} from '../../store/app.store';
import {transformDateForQuery} from '../../lib/utils';

export const DateInput = () => {

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const fetchData = useAppStore(state => state.fetchRangeData)
    const fetchOneData = useAppStore(state => state.fetchData)

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
        <div>Range date: <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            showYearDropdown
            scrollableYearDropdown
            placeholderText={transformDateForQuery(new Date())}
            minDate={new Date(1995, 5, 16)}
            maxDate={new Date()}
        />
        </div>
        <button onClick={searchDate}>Search</button>
    </div>

}
