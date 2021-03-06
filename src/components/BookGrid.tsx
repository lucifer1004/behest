import React from 'react'
import {BookGridProps} from '../common/types'
import BookItem from './BookItem'

const BookGrid: React.FunctionComponent<BookGridProps> = ({books}) => (
  <ol className="books-grid">
    {books && books.length > 0
      ? books.map(book => (
          <li key={book.id}>
            <BookItem book={book} />
          </li>
        ))
      : null}
  </ol>
)

export default BookGrid
