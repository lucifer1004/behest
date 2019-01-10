import React from 'react'
import {Book} from '../common/types'
import BookItem from './BookItem'

interface BookGridProps {
  books: Book[]
}

const BookGrid: React.SFC<BookGridProps> = ({books}) => (
  <ol className="books-grid">
    {books.map(book => (
      <li>
        <BookItem book={book} />
      </li>
    ))}
  </ol>
)

export default BookGrid
