import React, { useEffect, useState } from 'react';
import { Button } from '../../button';
import './hour-box.scss';
import '../../styles/theme-buttons.scss';

export const HourBox = (props: {
    value: any,
    hours: string[],
    onSelectHour: any
}) => {
    const [selectedHour, setSelectedHour] = useState(props.value)
    const [hours, setHours] = useState(props.hours || [])

    useEffect(() => {
        setHours(props.hours)
    }, [props.hours])

    const isHourSelected = (hour: string) => {
        setSelectedHour(hour)
        props.onSelectHour(hour);
    }

    return (
        <div className="hours-item">
            <div className="hours-box effect-slide_top">
                {hours.map((hour, i) => {
                    return (
                        <Button
                            className={`theme-button-outlined hour-item ${props.value === hour ? 'selected-hour' : null}`}
                            key={i}
                            label={hour}
                            onClick={() => {
                                isHourSelected(hour)
                            }} />
                    )
                })}
            </div>
        </div >
    )
}