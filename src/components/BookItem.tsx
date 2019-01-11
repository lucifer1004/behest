import React, {useContext} from 'react'
import {BookItemProps} from '../common/types'
import BooksDispatch from '../contexts/BooksDispatch'

const BookItem: React.FunctionComponent<BookItemProps> = ({book}) => {
  const dispatch = useContext(BooksDispatch)
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
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
          <select onChange={handleSelect} defaultValue={'MOVE_TO'}>
            <option value="MOVE_TO" disabled>
              Move this book to...
            </option>
            {book.status !== 'READING' ? (
              <option value="READING">Currently Reading</option>
            ) : null}
            {book.status !== 'TO_READ' ? (
              <option value="TO_READ">Want to Read</option>
            ) : null}
            {book.status !== 'READ' ? <option value="READ">Read</option> : null}
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
