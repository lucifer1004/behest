import React, {useEffect, useState, useReducer} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Book} from './common/types'
import {getAll} from './helpers/BooksAPI'
import BooksDispatch from './contexts/BooksDispatch'
import booksReducer from './reducers/BooksReducer'
import Main from './pages/Main'
import Search from './pages/Search'
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
          <Switch>
            <Route path="/search" component={Search} />
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
