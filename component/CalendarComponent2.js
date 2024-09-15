"use client";

import React, { useState, useEffect } from 'react';
import './CalendarComponent2.css';

export default function CalendarComponent2({result}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [year, setYear] = useState(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth());
    const [events, setEvents] = useState({});

    useEffect(() => {
        console.log('Result in CalendarComponent2:', result);
        setCurrentDate(new Date());
        organizeEvents();
    }, [result]);

    const organizeEvents = () => {
        console.log('Organizing events...');
        const organizedEvents = {};
        result.forEach((event, index) => {
            console.log(`Processing event ${index}:`, event);
            if (!event.createdAt) {
                console.error(`Event ${index} has no createdAt field:`, event);
                return;
            }

            // 서버에서 생성된 시간 문자열을 파싱
            const [datePart, timePart] = event.createdAt.split('. 오');
            const [year, month, day] = datePart.split('. ').map(num => parseInt(num, 10));
            const [hour, minute, second] = timePart.slice(2).split(':').map(num => parseInt(num, 10));
            
            // 한국 시간대로 Date 객체 생성
            const date = new Date(year, month - 1, day, hour + (timePart.includes('후') ? 12 : 0), minute, second);
            console.log(`Parsed date: ${date.toISOString()}`);

            if (isNaN(date.getTime())) {
                console.error(`Invalid date for event ${index}:`, event.createdAt);
                return;
            }

            const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            console.log(`Event key: ${key}`);
            if (!organizedEvents[key]) {
                organizedEvents[key] = [];
            }
            organizedEvents[key].push(event);
        });
        console.log('Organized events:', organizedEvents);
        setEvents(organizedEvents);
    };

    const handlePrevMonth = () => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    };

    const generateCalendar = (year, month) => {
        console.log(`Generating calendar for ${year}-${month}`);
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
                    const key = `${year}-${month}-${day}`;
                    const dayEvents = events[key] || [];
                    console.log(`Events for ${key}:`, dayEvents);
                    week.push({
                        day,
                        isToday: isToday(day),
                        events: dayEvents
                    });
                    day++;
                }
            }
            calendar.push(week);
        }
        return calendar;
    };
    
    const calendar = generateCalendar(year, month);

    return (
        <div className='calendar-container'>
            <div className='calendar-header'>
                <button onClick={handlePrevMonth}>이전 달</button>
                <span>{year}년 {month + 1}월</span> 
                <button onClick={handleNextMonth}>다음 달</button>                
            </div>
            <table className="calendar-table">
                <thead>
                    <tr>
                        <th>일</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th>토</th>
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
    )
}