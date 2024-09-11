import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";


export default async function Home() {

  const db = (await connectDB).db("forum2")
  let result = await db.collection('post').find().toArray()
  console.log(result)

  return (

    

    <div className="main-bg">
      {result.map((a,i) => (
        <div key={i} className="main-bg-1">
          <h1>{a.title}</h1>
          <p>{a.currentTime.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
