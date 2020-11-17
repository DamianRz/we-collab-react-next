import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar-box.scss';

export const CalendarBox = (props: {
    value: Date,
    onSelectDate: any
}) => {

    const [value, setValue] = useState(new Date())

    useEffect(() => {
        setValue(props.value || new Date())
    }, [props.value])

    return (
        <div className="calendar-box">
            <Calendar
                minDate={new Date()}
                onChange={props.onSelectDate}
                value={value}
            />
        </div>
    );
}
