'use client';

export default function EditFormComponent({ result }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const titleInput = e.target.title.value.trim();

        if (!titleInput) {
            alert("뭐먹었냐니까");
            return;
        }

        e.target.submit();
    };

    return (
        <form action="/api/edit" method="POST" className="main-input" onSubmit={handleSubmit}>
            <input type="text" name="title" defaultValue={result.title} />
            <input style={{ display: 'none' }} name="_id" defaultValue={result._id.toString()} />
            <button type="submit">수정</button>
        </form>
    );
}