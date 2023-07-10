function BookItem({ book, onAuthorBooks }) {
  return (
    <div className="book-item">
      <h1>{ book['book_details'][0].title }</h1>
      <h2>{ book['display_name'] }</h2>
      <div>Author: { book['book_details'][0].author }</div>
      <div>Description: { book['book_details'][0].description }</div>
      <a href={ book['amazon_product_url'] } target="_blank">Link to Amazon</a><br/>
      <button onClick={ onAuthorBooks.bind(this, book['book_details'][0].author) }>Get more books of this
        author
      </button>
    </div>
  );
}

export default BookItem;