import React from 'react'
import {BookGridProps} from '../common/types'
import BookItem from './BookItem'

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
