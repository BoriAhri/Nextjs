import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        console.log(req.body)
        let change = { title : req.body.title }
        let db = (await connectDB).db('forum2')
        let result = await db.collection('post')
        .updateOne({_id : new ObjectId(req.body._id)},
             { $set : change } ); 
        res.redirect(302, '/')
    }
}



// await db.collection(컬렉션명).updateOne({수정할게시물정보}, { $set : {수정할내용} } ); 