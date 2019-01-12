import React, {useEffect, useState, useReducer} from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import {AppState, Book} from './common/types'
import {getAll} from './helpers/BooksAPI'
import BooksDispatch from './contexts/BooksDispatch'
import booksReducer from './reducers/BooksReducer'
import Shelf from './components/Shelf'
import SearchBox from './components/SearchBox'
import './App.css'

const Main: React.FunctionComponent<AppState> = ({isLoading, books}) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        {!isLoading ? (
          <Shelf books={books} title="New books" type="NONE" />
        ) : (
          <Shelf books={[]} title="Loading new books..." type="NONE" />
        )}
      </div>
      <Shelf books={books} title="Want to read" type="TO_READ" />
      <Shelf books={books} title="Current reading" type="READING" />
      <Shelf books={books} title="Read" type="READ" />
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
              render={() => <Main isLoading={loadingStatus} books={books} />}
            />
          </Switch>
        </div>
      </BooksDispatch.Provider>
    </BrowserRouter>
  )
}

export default BooksApp
