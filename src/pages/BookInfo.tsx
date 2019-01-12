import React, {useEffect, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import SvgIcon from '@material-ui/core/SvgIcon'
import {Book} from '../common/types'
import {get} from '../helpers/BooksAPI'
import BookCard from '../components/BookCard'

const HomeIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
)

const BookInfo = ({match}: {match: any}) => {
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
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
        <div>
          <Link to="/">
            <Fab color="primary" aria-label="Home">
              <HomeIcon />
            </Fab>
          </Link>
          <BookCard book={book} />
        </div>
      )}
    </div>
  )
}

export default BookInfo
