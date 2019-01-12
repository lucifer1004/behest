import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import SvgIcon from '@material-ui/core/SvgIcon'
import {Book} from '../common/types'
import BookCard from '../components/BookCard'

const HomeIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
)

const BookInfo = ({match}: {match: any}) => {
  let localBooks = localStorage.getItem('local-books')
  if (!localBooks) return <Redirect to="/404" />
  const book = JSON.parse(localBooks).find(
    (localBook: Book) => localBook.id === match.params.id,
  )
  if (!book) return <Redirect to="/404" />
  return (
    <div
      style={{
        margin: 10,
      }}
    >
      <Link to="/">
        <Fab color="primary" aria-label="Home">
          <HomeIcon />
        </Fab>
      </Link>
      <BookCard book={book} />
    </div>
  )
}

export default BookInfo
