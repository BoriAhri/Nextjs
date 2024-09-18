import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import Link from "next/link"

export default async function Detail(props) {

    let db = (await connectDB).db('forum2')
    let result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)})
    console.log(result)

    return (
        <div>
            <h4>{result.title} 맛있었노</h4>
            <p>{result.createdAt}</p>
            <Link href={'/edit/' + result._id} className="edit-icon">✏️</Link>
        </div>
    )
}