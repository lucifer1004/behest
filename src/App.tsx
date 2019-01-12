import React, {useEffect, useState, useReducer} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {Book} from './common/types'
import {getAll} from './helpers/BooksAPI'
import BooksDispatch from './contexts/BooksDispatch'
import booksReducer from './reducers/BooksReducer'
import Main from './pages/Main'
import Search from './pages/Search'
import BookInfo from './pages/BookInfo'
import Error from './pages/Error'
import './App.css'

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
        dispatch({type: 'BOOKS_UPDATE', book: book})
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
          <Route path="/search" component={Search} />
          <Route
            exact
            path="/"
            render={() => <Main isLoading={loadingStatus} books={books} />}
          />
          <Route exact path="/book/:id" component={BookInfo} />
          <Route exact path="/404" component={Error} />
        </div>
      </BooksDispatch.Provider>
    </BrowserRouter>
  )
}

export default BooksApp
