'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ListItem({ result }) {
    const router = useRouter();  // Next.js의 useRouter 훅 사용
    const [editMode, setEditMode] = useState(null);  // 편집 모드 상태
    const [editDate, setEditDate] = useState('');    // 날짜/시간 수정 상태

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
                router.refresh();  // 페이지를 전체 새로고침하지 않고 데이터만 갱신
            } else {
                console.error('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleSaveDate = async (id) => {
        try {
            // ISO 날짜 형식을 한국어 형식으로 변환
            const date = new Date(editDate);
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const formattedDate = date.toLocaleString('ko-KR', options);  // 한국어 형식으로 변환
            
            const res = await fetch('/api/update-date', {
                method: 'POST',
                body: JSON.stringify({ 
                    id, 
                    createdAt: formattedDate  // 변환된 한국어 날짜 형식으로 전송
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        
            if (res.ok) {
                setEditMode(null);  // 수정 모드 해제
                router.refresh();   // 페이지 리프레시
            } else {
                console.error('Failed to update the date');
            }
        } catch (error) {
            console.error('Error updating date:', error);
        }
    };
    


    return (
        <div className="list-1">
            {result.map((a, i) => {
                const formattedTime = JSON.stringify(a.createdAt).slice(1, 21).replace('T', ' ');

                return (
                    <div key={i} className="main-bg-1">
                        <Link href={'/detail/' + a._id}><h1>{a.title}</h1></Link>

                        {/* formattedTime을 클릭하면 날짜/시간을 수정할 수 있는 입력 필드로 전환 */}
                        {editMode === a._id ? (
                            <div>
                                <input
                                    type="datetime-local"
                                    value={editDate}
                                    onChange={(e) => setEditDate(e.target.value)}
                                />
                                <button onClick={() => handleSaveDate(a._id)}>저장</button>
                                <button onClick={() => setEditMode(null)}>취소</button>
                            </div>
                        ) : (
                            <p onClick={() => {
                                setEditMode(a._id);
                                setEditDate(formattedTime);
                            }}>
                                {formattedTime} ({a.dayName})
                            </p>
                        )}

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
