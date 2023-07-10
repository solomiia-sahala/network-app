import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import { author_request_path, LIST_NAME_OPTIONS, request_path } from './communication/nytimes.api.paths';
import { ApiKey } from './communication/api-key.const';
import BookItem from './components/bookItem/BookItem';
import AuthorBook from './components/authorBook/AuthorBook';

function App() {
  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [hideBookItems, setHideBookItems] = useState(false);
  const getBooks = async (listName) => {
    try {
      const response = await fetch(`${ request_path }?list=${ listName }&api-key=${ ApiKey }`);
      const json = await response.json();
      setBooks(json.results);
      console.log(json.results)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getBooksByAuthor = async (author) => {
    const authorMath = author.split(' ');
    authorMath[0] = authorMath[0] + '%20';
    try {
      const response = await fetch(`${ author_request_path }${ authorMath.join('') }&api-key=${ ApiKey }`);
      const json = await response.json();
      setAuthorBooks(json.results);
      console.log(json.results)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setHideBookItems(true);
    }
  }
  useEffect(() => {
    getBooks(LIST_NAME_OPTIONS.hardcoverFiction);
  }, []);

  return (
    <div className="App">
      <Header/>
      <div className="button-container">
        <button onClick={ getBooks.bind(this, LIST_NAME_OPTIONS.paperbackNonfiction) }>Click here to get Paperback
          books
        </button>
      </div>
      { hideBookItems && <div>
        <button onClick={ setHideBookItems.bind(this, false) }>Back to all books</button>
      </div> }
      <div className="main-container">
        { hideBookItems ? authorBooks.map(book => <AuthorBook book={ book }/>) : books.map(book => <BookItem
          book={ book } onAuthorBooks={ getBooksByAuthor }/>) }
      </div>
    </div>
  );
}

export default App;
