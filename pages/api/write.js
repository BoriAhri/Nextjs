export default function handler(req, res) {
    if (req.method == 'POST'){
        let time = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
        res.status(200).json(time)
    }
}