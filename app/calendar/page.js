import CalendarComponent2 from "@/component/CalendarComponent2";
import { connectDB } from "@/util/database";


export default async function Calendar() {

    const db = (await connectDB).db("forum2")
    let result = await db.collection('post').find().toArray()

    result = result.map(post => ({
        ...post,
        _id: post._id.toString()
    }));

    return (
        <div>
            <CalendarComponent2 result={result} />
        </div>
    );
}