import './header.css'
import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export const Header = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    return <div className={'header'}>
        <div className={'header__container'}>
            Astronomy Picture of the Day
            <DatePicker
                onChange={(date: Date | null)=>setStartDate(date)}
                selected={startDate}/>
        </div>
    </div>
}

