import React from 'react'
import {BookItemProps} from '../common/types'
import BookSelect from './BookSelect'

const BookItem: React.FunctionComponent<BookItemProps> = ({
  book,
  draggable = true,
}) => {
  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.setData('id', book.id)
  }

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          draggable={draggable}
          onDragStart={handleDragStart}
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url('${
              book.imageLinks
                ? book.imageLinks.thumbnail
                : 'https://images.unsplash.com/photo-1469827160215-9d29e96e72f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
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
