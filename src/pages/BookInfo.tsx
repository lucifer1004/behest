import React, {useContext, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {Book} from '../common/types'
import {get} from '../helpers/BooksAPI'
import BooksDispatch from '../contexts/BooksDispatch'
import BookCard from '../components/BookCard'

const BookInfo = ({match}: {match: any}) => {
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useContext(BooksDispatch)
  const getLocal = () => {
    let localBooks = localStorage.getItem('local-books')
    if (!localBooks) return false
    const localBook = JSON.parse(localBooks).find(
      (book: Book) => book.id === match.params.id,
    )
    if (!localBook) return false
    else return localBook
  }
  useEffect(() => {
    /**
     * First fetch the book from localStorage
     */
    const localBook = getLocal()
    if (localBook) {
      setBook(localBook)
      setLoading(false)
    } else {
      /**
       * If not found, then fetch it from BooksAPI
       */
      get(match.params.id).then(remoteBook => {
        setBook(remoteBook)
        setLoading(false)
        dispatch({type: 'BOOKS_UPDATE', book: remoteBook})
      })
    }
  }, [])
  return (
    <div
      style={{
        margin: 10,
      }}
    >
      {loading ? (
        'Loading...'
      ) : !book ? (
        <Redirect to="/404" />
      ) : (
        <BookCard book={book} />
      )}
    </div>
  )
}

export default BookInfo
