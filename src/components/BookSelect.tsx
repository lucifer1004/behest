import React, {useContext} from 'react'
import {BookItemProps} from '../common/types'
import BooksDispatch from '../contexts/BooksDispatch'

const BookSelect: React.FunctionComponent<BookItemProps> = ({book}) => {
  const dispatch = useContext(BooksDispatch)
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: 'BOOKS_UPDATE', book: {...book, status: e.target.value}})
  }
  return (
    <div className="book-shelf-changer">
      <select value={book.status} onChange={handleSelect}>
        <option value="NONE" disabled>
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
  )
}

export default BookSelect
