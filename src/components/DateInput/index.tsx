import React, {useEffect, useState} from 'react';
import {fetchDataSelector, fetchRangeDataSelector, isLoadingSelector, useAppStore} from '../../store/app';
import {transformDateForQuery, utcTimeNow} from '../../utils/utils';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import './dateInput.css'

export const DateInput = () => {

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [displayDate, setDisplayDate] = useState<string | null>(null);

    const fetchOneData = useAppStore(fetchDataSelector)
    const fetchData = useAppStore(fetchRangeDataSelector)
    const isLoading = useAppStore(isLoadingSelector)

    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const displayDateHandler = (start: string | null, end: string | null) => {
        if (!start && !end) return setDisplayDate('Today')
        if (start === end) return setDisplayDate(start)
        if (start && end) return setDisplayDate(start + '/' + end)
        if (start && !end) return setDisplayDate(start)
    }

    const searchDate = () => {
        if (startDate && endDate) {
            fetchData(transformDateForQuery(startDate), transformDateForQuery(endDate))
        }
        if (startDate && !endDate) {
            fetchData(transformDateForQuery(startDate), transformDateForQuery(startDate))
        }
        if (!startDate && !endDate) {
            fetchOneData()
            setDisplayDate('Today')
        }

    }

    useEffect(() => {
        displayDateHandler(transformDateForQuery(startDate), transformDateForQuery(endDate))
    }, [isLoading]);

    return <div className={'date'}>
        {displayDate &&
            <div className={'date__range-text'} title={displayDate}><span>Show:</span> {displayDate}</div>}
        <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            onCalendarClose={searchDate}
            showYearDropdown
            showMonthDropdown
            selectsRange
            placeholderText={'select date'}
            dropdownMode={'select'}
            minDate={new Date(1995, 5, 16)}
            maxDate={utcTimeNow()}
            withPortal
            disabled={isLoading}
            customInput={
                <button>Select date</button>
            }
        />
    </div>
}
