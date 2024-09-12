import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";
import Link from "next/link";
import ListItem from "../component/ListItem";
import FormComponent from "@/component/FormComponent";


export default async function Home() {

  const db = (await connectDB).db("forum2")
  let result = await db.collection('post').find().toArray()

  result = result.map(post => ({
    ...post,
    _id: post._id.toString()
  }));



  return (

    <div className="main-bg">
      <FormComponent />
      <ListItem result={result} />
    </div>
  );
}



