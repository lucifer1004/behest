import React from 'react'
import {ShelfProps} from '../common/types'
import BookGrid from './BookGrid'

const Shelf: React.FunctionComponent<ShelfProps> = ({books, title, type}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <BookGrid books={books.filter(book => book.status === type)} />
    </div>
  </div>
)

export default Shelf
