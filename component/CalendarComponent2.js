"use client";

import React, { useState, useEffect, useMemo } from 'react';
import './CalendarComponent2.css';

export default function CalendarComponent2({result}) {
    const [currentDate, setCurrentDate] = useState(() => new Date());
    const [year, setYear] = useState(() => currentDate.getFullYear());
    const [month, setMonth] = useState(() => currentDate.getMonth());

    const events = useMemo(() => {
        console.log('Organizing events...');
        const organizedEvents = {};
        result.forEach((event, index) => {
            if (!event.createdAt) {
                console.error(`Event ${index} has no createdAt field:`, event);
                return;
            }

            const date = parseKoreanDate(event.createdAt);
            if (isNaN(date.getTime())) {
                console.error(`Invalid date for event ${index}:`, event.createdAt);
                return;
            }

            const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            if (!organizedEvents[key]) {
                organizedEvents[key] = [];
            }
            organizedEvents[key].push(event);
        });
        return organizedEvents;
    }, [result]);

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    const handleMonthChange = (increment) => {
        setMonth(prevMonth => {
            const newMonth = prevMonth + increment;
            if (newMonth === -1) {
                setYear(prevYear => prevYear - 1);
                return 11;
            } else if (newMonth === 12) {
                setYear(prevYear => prevYear + 1);
                return 0;
            }
            return newMonth;
        });
    };

    const calendar = useMemo(() => generateCalendar(year, month, events), [year, month, events]);

    return (
        <div className='calendar-container'>
            <div className='calendar-header'>
                <button onClick={() => handleMonthChange(-1)}>이전 달</button>
                <span>{year}년 {month + 1}월</span> 
                <button onClick={() => handleMonthChange(1)}>다음 달</button>                
            </div>
            <table className="calendar-table">
                <thead>
                    <tr>
                        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {calendar.map((week, i) => (
                        <tr key={i}>
                            {week.map((dateObj, j) => (
                                <td key={j} className={getDateClassName(dateObj)}>
                                    {dateObj && (
                                        <>
                                            <div>{dateObj.day}</div>
                                            {dateObj.events.map((event, index) => (
                                                <div key={index} className="event-title">{event.title}</div>
                                            ))}
                                        </>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function parseKoreanDate(dateString) {
    const [datePart, timePart] = dateString.split('. 오');
    const [year, month, day] = datePart.split('. ').map(num => parseInt(num, 10));
    const [hour, minute, second] = timePart.slice(2).split(':').map(num => parseInt(num, 10));
    
    return new Date(year, month - 1, day, hour + (timePart.includes('후') ? 12 : 0), minute, second);
}

function generateCalendar(year, month, events) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const calendar = [];

    let day = 1;
    for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDayOfMonth) || day > daysInMonth) {
                week.push(null);
            } else {
                const key = `${year}-${month}-${day}`;
                week.push({
                    day,
                    isToday: isToday(new Date(year, month, day)),
                    events: events[key] || []
                });
                day++;
            }
        }
        calendar.push(week);
        if (day > daysInMonth) break;
    }
    return calendar;
}

function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

function getDateClassName(dateObj) {
    if (!dateObj) return 'calendar-empty';
    return dateObj.isToday ? 'calendar-day today' : 'calendar-day';
}