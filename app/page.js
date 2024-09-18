import { connectDB } from "@/util/database";
import ListItem from "../component/ListItem";
import FormComponent from "@/component/FormComponent";
import Pagination from "@/component/Pagination";

export default async function Home({ searchParams }) {
    const page = parseInt(searchParams.page || '1'); // 페이지 번호 가져오기, 기본값 1
    const limit = 7;
    const skip = (page - 1) * limit;

    // MongoDB 연결 후 데이터 가져오기
    const db = (await connectDB).db("forum2");
    let result = await db.collection('post').find().sort({ createdAt: -1 }).skip(skip).limit(limit).toArray();

    result = result.map(post => ({
        ...post,
        _id: post._id.toString(),
    }));

    // 게시글이 없을 경우 "글이 없습니다" 표시
    const hasNextPage = result.length > 0;

    return (
        <div className="main-bg">
            <FormComponent />
            {hasNextPage ? <ListItem result={result} /> : <p>많이 먹어라</p>}
            <Pagination currentPage={page} hasNextPage={hasNextPage} />  {/* Pagination 컴포넌트에 hasNextPage 전달 */}
        </div>
    );
}


{/* <ListItem title={result.title} date="2018039239432" onEditButtonClick={() => {}}  onDeleteButtonClick={()=> {}}/>

<ListItem title={result2.name} date="2018039239432" onEditButtonClick={() => {}}  onDeleteButtonClick={()=> {}}/>  */}
