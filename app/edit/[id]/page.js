import EditFormComponent from "@/component/EditFormComponent"
import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function Edit(props) {
    console.log(props)

    let db = (await connectDB).db('forum2')
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })
    
    // props = { params: { id: '66e2526fb94976ffec39aebc' }, searchParams: {} }
    // props.params.id = '66e2526fb94976ffec39aebc'
    // result = { _id: 66e2526fb94976ffec39aebc, title: '블라블라', currentTime: '2021-07-07T04:06:00.000Z' }


    return (
        <div>
            <EditFormComponent result={result} />
        </div>
    )
}