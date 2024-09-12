'use client';

export default function FormComponent() {
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
    <form action="/api/write" method="POST" className="main-input" onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="뭐먹었노" />
      <button type="submit">작성</button>
    </form>
  );
}