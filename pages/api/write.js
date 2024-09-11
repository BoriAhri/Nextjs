import { connectDB } from "@/util/database"

export default async function handler(req, res) {
    if (req.method == 'POST'){
        console.log(req.body)
        let time = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
        let db = (await connectDB).db('forum2')
        let result = db.collection('post').insertOne({...req.body, currentTime: time})
    
        res.redirect(302, '/')
    }
}

