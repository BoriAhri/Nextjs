import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method == 'DELETE') {
        console.log(req.body)
        let db = (await connectDB).db('forum2')
        let result = await db.collection('post').deleteOne({ _id: new ObjectId(req.body) });
        res.redirect(302, '/')
    }
}