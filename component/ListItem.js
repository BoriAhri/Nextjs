'use client'

import Link from "next/link";

export default function ListItem({ result }) {


    return (
        <div className="list-1">
            {result.map((a, i) => {
                const formattedTime = JSON.stringify(a.createdAt).slice(1, 21).replace('T', ' ');
                return (
                    <div key={i} className="main-bg-1">
                        <Link href={'/detail/' + a._id}><h1>{a.title}</h1></Link>
                        <p>{formattedTime} ({a.dayName})</p>

                        <Link href={'/edit/' + a._id}>✏️</Link>

                        <span className="delete-icon" onClick={(e) => {
                            fetch('/api/delete', {
                                method: 'DELETE',
                                body: JSON.stringify({ id: a._id }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then(() => {
                                    window.location.reload(); // 페이지 새로고침
                                });
                        }}>🗑️</span>
                    </div>
                );
            })}
        </div>
    );
}