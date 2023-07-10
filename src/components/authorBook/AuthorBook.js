function AuthorBook({ book }) {
  return (
    <div className="book-item">
      <h1>{ book['book_title'] }</h1>
      <h2>{ book['byline'] }</h2>
      <div>Author: { book['book_author'] }</div>
      <div>Author: { book['publication_dt'] }</div>
      <div>Description: { book['summary'] }</div>
      <a href={ book['url'] } target="_blank">Link to NY Times</a><br/>
    </div>
  );
}

export default AuthorBook;