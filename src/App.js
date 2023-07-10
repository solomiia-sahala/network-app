import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import { author_request_path, LIST_NAME_OPTIONS, request_path } from './communication/nytimes.api.paths';
import { ApiKey } from './communication/api-key.const';
import BookItem from './components/bookItem/BookItem';
import AuthorBook from './components/authorBook/AuthorBook';
import Button from './components/button/Button';

function App() {
  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [activeBookTab, setActiveBookTab] = useState(LIST_NAME_OPTIONS.hardcoverFiction);
  const [hideBookItems, setHideBookItems] = useState(false);
  const getBooks = async (listName) => {
    setActiveBookTab(listName);
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
        { activeBookTab === LIST_NAME_OPTIONS.hardcoverFiction ?
          <Button label={ 'Click here to get Paperback books' } callback={ getBooks }
                  callbackParam={ LIST_NAME_OPTIONS.paperbackNonfiction }/> :
          <Button label={ 'Click here to get Hardcover books' } callback={ getBooks }
                  callbackParam={ LIST_NAME_OPTIONS.hardcoverFiction }/> }
      </div>
      { hideBookItems && <div>
        <Button label={ 'Back to all books' } callback={ setHideBookItems } callbackParam={ false }/>
      </div> }
      <div className="main-container">
        { hideBookItems ? (!!authorBooks.length ? authorBooks?.map(book => <AuthorBook
          book={ book }/>) : 'No books found') : books?.map(book => <BookItem
          book={ book } onAuthorBooks={ getBooksByAuthor }/>) }
      </div>
    </div>
  );
}

export default App;
