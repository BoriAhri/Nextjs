import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if (req.method == 'POST'){
        console.log(req.body);

        // 현재 날짜와 시간을 가져옴
        let currentDate = new Date();        
        const koreaTimezone = new Intl.DateTimeFormat('ko-KR', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true // 12시간 형식 사용
        }).format(currentDate);

        // 요일을 한글로 변환
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        let dayName = daysOfWeek[currentDate.getDay()];

        let db = (await connectDB).db('forum2');
        
        // createdAt과 dayName 필드 추가
        let result = await db.collection('post').insertOne({
            ...req.body,
            createdAt: koreaTimezone, // 현재 시간을 createdAt 필드에 저장
            dayName: dayName // 요일을 dayName 필드에 저장
        });

        res.redirect(302, '/');
    }
}