import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";
import Link from "next/link";
import ListItem from "./ListItem";


export default async function Home() {

  const db = (await connectDB).db("forum2")
  let result = await db.collection('post').find().toArray()

  result = result.map(post => ({
    ...post,
    _id: post._id.toString()
  }));

  

  return (

    <div className="main-bg">

      <form action="/api/write" method="POST" className="main-input">
        <input type="text" name="title" placeholder="뭐먹었노" />
        <button type="submit">작성</button>
      </form>

      <ListItem result={result} />
    </div>
  );
}



