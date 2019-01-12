import React, {useContext} from 'react'
import {BookItemProps, ShelfType} from '../common/types'
import BooksDispatch from '../contexts/BooksDispatch'

const BookSelect: React.FunctionComponent<BookItemProps> = ({book}) => {
  const dispatch = useContext(BooksDispatch)
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: 'BOOKS_UPDATE', book: {...book, shelf: e.target.value}})
    book.shelf = e.target.value as ShelfType
  }
  return (
    <div className="book-shelf-changer">
      <select value={book.shelf || 'default'} onChange={handleSelect}>
        <option value="default" disabled>
          Move this book to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
      </select>
    </div>
  )
}

export default BookSelect
