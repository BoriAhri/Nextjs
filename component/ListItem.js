'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ListItem({ result }) {
    const router = useRouter();  // Next.js의 useRouter 훅 사용

    const handleDelete = async (id) => {
        try {
            const res = await fetch('/api/delete', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                // 서버에서 삭제가 성공하면 화면을 새로고침하지 않고 리프레시
                router.refresh();  // 페이지를 전체 새로고침하지 않고 데이터만 갱신
            } else {
                console.error('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

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

                            <button
                                type="button"
                                className="delete-icon"
                                onClick={() => handleDelete(a._id)}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
