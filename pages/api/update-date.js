import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        console.log(req.body);

        // req.body로부터 createdAt과 title을 가져옵니다.
        let change = {
            createdAt: req.body.createdAt  // createdAt 값을 그대로 사용
        };

        let db = (await connectDB).db('forum2');
        let result = await db.collection('post')
            .updateOne({ _id: new ObjectId(req.body.id) },  // req.body._id -> req.body.id 수정
                { $set: change });

        res.redirect(302, '/');
    }
}
