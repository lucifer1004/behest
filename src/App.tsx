import React, {useEffect, useState, useReducer} from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import {AppState, Book} from './common/types'
import {getAll} from './helpers/BooksAPI'
import BooksDispatch from './contexts/BooksDispatch'
import booksReducer from './reducers/BooksReducer'
import Shelf from './components/Shelf'
import SearchBox from './components/SearchBox'
import './App.css'

const Main: React.FunctionComponent<AppState> = ({
  isLoading,
  newBooks,
  booksToRead,
  booksReading,
  booksRead,
}) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        {!isLoading ? (
          <Shelf books={newBooks} title="New books" />
        ) : (
          <Shelf books={[]} title="Loading new books..." />
        )}
      </div>
      <Shelf books={booksToRead} title="Want to read" />
      <Shelf books={booksReading} title="Current reading" />
      <Shelf books={booksRead} title="Read" />
    </div>
    <div className="open-search">
      <Link to="/search">
        <button>Add a book</button>
      </Link>
    </div>
  </div>
)

const BooksApp: React.FunctionComponent<{}> = () => {
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [newBooks, setNewBooks] = useState([])
  const [booksToRead, setBooksToRead] = useState([])
  const [booksRead, setBooksRead] = useState([])
  const [booksReading, setBooksReading] = useState([])
  const [{books}, dispatch] = useReducer(booksReducer, {books: []})

  /**
   * Fetch books from localStorage and BooksAPI.getAll()
   */
  useEffect(() => {
    const localBooks = localStorage.getItem('local-books')
    if (localBooks) {
      books.push(...JSON.parse(localBooks))
    }
    getAll().then(newBooks => {
      newBooks.forEach((book: Book) => {
        dispatch({type: 'BOOKS_UPDATE', book: {...book, status: 'NONE'}})
      })
      setLoadingStatus(false)
    })
  }, [])

  /**
   * Update shelves and localStorage
   */
  useEffect(
    () => {
      setNewBooks(books.filter(book => book.status === 'NONE') as any)
      setBooksToRead(books.filter(book => book.status === 'TO_READ') as any)
      setBooksRead(books.filter(book => book.status === 'READ') as any)
      setBooksReading(books.filter(book => book.status === 'READING') as any)
      localStorage.setItem('local-books', JSON.stringify(books))
    },
    [books],
  )

  return (
    <BrowserRouter>
      <BooksDispatch.Provider value={dispatch}>
        <div className="app">
          <Switch>
            <Route path="/search" component={SearchBox} />
            <Route
              path="/"
              render={() => (
                <Main
                  isLoading={loadingStatus}
                  newBooks={newBooks}
                  booksToRead={booksToRead}
                  booksRead={booksRead}
                  booksReading={booksReading}
                />
              )}
            />
          </Switch>
        </div>
      </BooksDispatch.Provider>
    </BrowserRouter>
  )
}

export default BooksApp
