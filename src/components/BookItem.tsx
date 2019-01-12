import React from 'react'
import {BookItemProps} from '../common/types'
import BookSelect from './BookSelect'

const BookItem: React.FunctionComponent<BookItemProps> = ({book}) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url('${
              book.imageLinks ? book.imageLinks.thumbnail : ''
            }')`,
          }}
        />
        <BookSelect book={book} />
      </div>
      <div className="book-title">{book.title || null}</div>
      <div className="book-authors">
        {book.authors ? book.authors.join(', ') : null}
      </div>
    </div>
  )
}

export default BookItem
