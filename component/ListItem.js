'use client'

import Link from "next/link";

export default function ListItem({ result }) {

    const sortedResult = [...result].reverse();

    return (
        <div className="list-1">
            {sortedResult.map((a, i) => {
                return (
                    <div key={i} className="main-bg-1">
                        <Link href={'/detail/' + a._id}><h1>{a.title}</h1></Link>
                        <p>{JSON.stringify(a.currentTime, null, 2)}</p>
                        
                        <Link href={'/edit/' + a._id}>✏️</Link>
                        
                        <button onClick={(e) => {
                            fetch('/api/delete', {
                                method: 'DELETE',
                                body: result[i]._id
                            })
                                .then(() => {
                                    e.target.parentElement.style.opacity = 0;
                                    setTimeout(() => {
                                        e.target.parentElement.style.display = 'none';
                                    }, 1000);
                                })
                        }}>🗑️</button>
                    </div>
                );
            })}
        </div>
    );
}