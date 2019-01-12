import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Book} from '../common/types'

const BookInfo = ({match}: {match: any}) => {
  let localBooks = localStorage.getItem('local-books')
  if (!localBooks) return <Redirect to="/404" />
  const book = JSON.parse(localBooks).find(
    (localBook: Book) => localBook.id === match.params.id,
  )
  if (!book) return <Redirect to="/404" />
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>{book.title}</h1>
    </div>
  )
}

export default BookInfo
