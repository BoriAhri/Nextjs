import { connectDB } from "@/util/database"

export default async function handler(req, res) {
    if (req.method == 'POST'){
        console.log(req.body);

        // 현재 날짜와 시간을 가져옴
        let currentDate = new Date();

        // 요일을 한글로 변환
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        let dayName = daysOfWeek[currentDate.getDay()];

        // 현재 시간을 'ko-KR' 시간대 형식으로 포맷
        let time = currentDate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

        let db = (await connectDB).db('forum2');
        
        // currentTime에 요일 추가
        let result = await db.collection('post').insertOne({
            ...req.body,
            currentTime: `${time} (${dayName}요일)`
        });

        res.redirect(302, '/');
    }
}