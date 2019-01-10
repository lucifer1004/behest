import React from 'react'
import {ShelfProps} from '../common/types'
import BookGrid from './BookGrid'

const Shelf: React.SFC<ShelfProps> = ({books, title}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <BookGrid books={books} />
    </div>
  </div>
)

export default Shelf
