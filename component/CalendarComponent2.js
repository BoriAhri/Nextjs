"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import './CalendarComponent2.css';

export default function CalendarComponent2({ result }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [year, setYear] = useState(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth());

    const parseKoreanDate = (dateString) => {
        const [datePart, timePart] = dateString.split('. 오');
        const [year, month, day] = datePart.split('. ').map(num => parseInt(num, 10));
        const [hour, minute, second] = timePart.slice(2).split(':').map(num => parseInt(num, 10));
        
        return new Date(year, month - 1, day, hour + (timePart.includes('후') ? 12 : 0), minute, second);
    };

    const events = useMemo(() => {
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

    useEffect(() => {
        console.log('Events updated:', events);        
    }, [events]);

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

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    };

    const generateCalendar = (year, month, events) => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const calendar = [];
        let day = 1;

        for (let i = 0; i < 6; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    week.push(null);
                } else if (day > daysInMonth) {
                    week.push(null);
                } else {
                    const dateKey = `${year}-${month}-${day}`;
                    const dateEvents = events[dateKey] || [];

                    week.push({
                        day,
                        isToday: isToday(day),
                        events: dateEvents
                    });
                    day++;
                }
            }
            calendar.push(week);
        }
        return calendar;
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
                                <td key={j} className={dateObj ? (dateObj.isToday ? 'calendar-day today' : 'calendar-day') : 'calendar-empty'}>
                                    {dateObj && (
                                        <>
                                            <div>{dateObj.day}</div>
                                            {dateObj.events.map((event, index) => (
                                                <Link key={index} href={`/detail/${event._id}`}>
                                                    <div className="event-title">{event.title}</div>
                                                </Link>
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