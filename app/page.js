import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";
import Link from "next/link";


export default async function Home() {

  const db = (await connectDB).db("forum2")
  let result = await db.collection('post').find().toArray()
  console.log(result)

  return (

    <div className="main-bg">

      <form action="/api/write" method="POST" className="main-input">
        <input type="text" name="title" placeholder="뭐먹었노" />
        <button type="submit">작성</button>
      </form>

      {result.map((a, i) => {
        return (
          <div key={i} className="main-bg-1">
            <Link href={'/detail/' + result[i]._id}><h1>{a.title}</h1></Link>
            <p>{JSON.stringify(a.currentTime, null, 2)}</p>
            <button>✏️</button>
            <button>🗑️</button>

          </div>
        );
      })}
    </div>
  );
}



