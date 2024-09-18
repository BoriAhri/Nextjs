"use client";

import React, { useState, useEffect } from 'react';
import './CalendarComponent.css';
import Link from 'next/link';

const CalendarComponent = ({ result }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [year, setYear] = useState(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth());

    useEffect(() => { 
        const now = new Date(); 
        const koreaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));  
        setCurrentDate(koreaTime); 
    }, []);  

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const generateCalendar = (year, month) => {
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
                    week.push(day);
                    day++;
                }
            }
            calendar.push(week);
        }
        return calendar;
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

    const calendar = generateCalendar(year, month);

    const formatKoreaTime = (date) => {
        return new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'Asia/Seoul'
        }).format(date);
    };

    const getTitlesForDate = (day) => {
        if (!result || !Array.isArray(result)) return [];
        const date = new Date(year, month, day);
        const formattedDate = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
        return result.filter(item => {
            const itemDate = new Date(item.createdAt.split(' ').slice(0, 3).join(' '));
            return itemDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) === formattedDate;
        }).map(item => item.title);
    };

    return (
        <div className="calendar-container">
            <h1>한국 시간 달력</h1>
            <p>현재 시간: {formatKoreaTime(currentDate)}</p>
            <div className="calendar-header">
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
                            {week.map((day, j) => {
                                const isToday = day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear();
                                const titles = day ? getTitlesForDate(day) : [];
                                return (
                                    <td
                                        key={j}
                                        className={isToday ? 'today' : ''}
                                    >
                                        {day && (
                                            <div className="day-cell">
                                                
                                                <div className="day-header">
                                                    <span className="day-number">{day}</span>
                                                </div>
                                                <div className="event-container">
                                                    {titles.slice(0, 3).map((title, index) => (
                                                        <div key={index} className="event-title">{title}</div>
                                                    ))}
                                                    {titles.length > 3 && (
                                                        <div className="event-more">...</div>
                                                    )}
                                                    
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CalendarComponent;