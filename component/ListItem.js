'use client';

import Link from 'next/link';

export default function ListItem({ result }) {
    return (
        <div className="list-1">
            {result.map((a, i) => {
                const formattedTime = JSON.stringify(a.createdAt).slice(1, 21).replace('T', ' ');

                return (
                    <div key={i} className="main-bg-1">
                        <Link href={'/detail/' + a._id}><h1>{a.title}</h1></Link>
                        <p>{formattedTime} ({a.dayName})</p>

                        {/* 이모티콘들을 감싸는 새로운 div */}
                        <div className="icon-wrapper">
                            <Link href={'/edit/' + a._id} className="edit-icon">✏️</Link>

                            <form action="/api/delete" method="POST" style={{ display: 'inline' }}>
                                <input type="hidden" name="id" value={a._id} />
                                <button type="submit" className="delete-icon">🗑️</button>
                            </form>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
