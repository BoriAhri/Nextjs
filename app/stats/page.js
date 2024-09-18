import LineChart from "@/component/LineChart";
import OldFoodChart from "@/component/OldFoodChart";
import { connectDB } from "@/util/database";

export default async function Stats() {
    let db = (await connectDB).db('forum2');
    let result = await db.collection('post').find().toArray();

    // title 별로 카운트하는 로직
    let countByTitle = result.reduce((acc, post) => {
        acc[post.title] = (acc[post.title] || 0) + 1;  // title별로 카운트 증가
        return acc;
    }, {});

    return (
        <div>
            {/* <ul>
                {Object.keys(countByTitle).map((title) => (
                    <li key={title}>
                        {title}: {countByTitle[title]}번
                    </li>
                ))}
            </ul> */}
            <LineChart result={result} />
            {/* <OldFoodChart result={result} /> */}
        </div>
    );
}
