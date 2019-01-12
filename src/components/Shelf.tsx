import React, {useContext} from 'react'
import {ShelfProps} from '../common/types'
import BookGrid from './BookGrid'
import BooksDispatch from '../contexts/BooksDispatch'

const Shelf: React.FunctionComponent<ShelfProps> = ({
  books,
  title,
  type,
  draggable = true,
}) => {
  const dispatch = useContext(BooksDispatch)

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    const id = e.dataTransfer.getData('id')
    dispatch({type: 'BOOKS_UPDATE', book: {id: id, shelf: type}})
  }

  return (
    <div className="bookshelf" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h2 className="bookshelf-title">
        {title} ({books.filter(book => book.shelf === type).length})
      </h2>
      <div className="bookshelf-books">
        <BookGrid
          books={books.filter(book => book.shelf === type)}
          draggable={draggable}
        />
      </div>
    </div>
  )
}

export default Shelf
