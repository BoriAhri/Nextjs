import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function Detail(props) {

    let db = (await connectDB).db('forum2')
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })
    console.log(result)

    return (
        <div>
            <form action="/api/edit" method="POST" className="main-input">
                <input type="text" name="title" defaultValue={result.title} />
                <input style={{display:'none'}} name="_id" defaultValue={result._id.toString()}/>
                <button type="submit">수정</button>
            </form>
        </div>
    )
}