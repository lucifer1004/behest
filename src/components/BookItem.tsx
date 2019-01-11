import React, {useContext} from 'react'
import {BookItemProps} from '../common/types'
import BooksDispatch from '../contexts/BooksDispatch'

const BookItem: React.FunctionComponent<BookItemProps> = ({book}) => {
  const dispatch = useContext(BooksDispatch)
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: 'BOOKS_UPDATE', book: {...book, status: e.target.value}})
  }
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
        <div className="book-shelf-changer">
          <select onChange={handleSelect}>
            <option value="MOVE_TO" selected disabled>
              Move this book to...
            </option>
            <option value="READING" disabled={book.status === 'READING'}>
              Currently Reading
            </option>
            <option value="TO_READ" disabled={book.status === 'TO_READ'}>
              Want to Read
            </option>
            <option value="READ" disabled={book.status === 'READ'}>
              Read
            </option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title || null}</div>
      <div className="book-authors">
        {book.authors ? book.authors.join(', ') : null}
      </div>
    </div>
  )
}

export default BookItem
