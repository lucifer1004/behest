import React, {useState, ChangeEvent, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {search} from '../helpers/BooksAPI'
import {useDebounce} from '../helpers/CustomHooks'
import BookGrid from './BookGrid'

const SearchBox: React.FunctionComponent = ({}) => {
  const [input, updateInput] = useState('')
  const [books, updateBooks] = useState([])
  const [found, setFound] = useState(false)
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    updateInput(e.target.value)
  }

  const debouncedInput = useDebounce(input, 500)

  useEffect(
    () => {
      if (debouncedInput === '') return
      search(debouncedInput).then(books => {
        if (!books) return
        if (books.hasOwnProperty('error')) {
          setFound(false)
          return
        }
        setFound(true)
        updateBooks(books)
      })
    },
    [debouncedInput],
  )

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="search-books-results">
        {input === '' ? '' : found ? <BookGrid books={books} /> : 'No results'}
      </div>
    </div>
  )
}
export default SearchBox
