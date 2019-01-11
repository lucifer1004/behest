import React from 'react'
import {BookItemProps} from '../common/types'

const BookItem: React.SFC<BookItemProps> = ({book}) => (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${
            book.imageLinks ? book.imageLinks.thumbnail : ''
          }")`,
        }}
      />
      <div className="book-shelf-changer">
        <select>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book.title || null}</div>
    <div className="book-authors">
      {book.authors ? book.authors.join(', ') : null}
    </div>
  </div>
)

export default BookItem
