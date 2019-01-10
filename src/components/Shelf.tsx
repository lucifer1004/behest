import React from 'react'
import {Book} from '../common/types'
import BookGrid from './BookGrid'

interface ShelfProps {
  books: Book[]
  title: string
}

const Shelf: React.SFC<ShelfProps> = ({books, title}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <BookGrid books={books} />
    </div>
  </div>
)

export default Shelf
