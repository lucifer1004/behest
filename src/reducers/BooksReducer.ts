import {Book, ShelfType} from '../common/types'
import {update} from '../helpers/BooksAPI'

interface BooksState {
  books: Book[]
}

interface IBooksReset {
  type: 'BOOKS_RESET'
}

interface IBooksUpdate {
  type: 'BOOKS_UPDATE'
  book: Book
}

type Actions = IBooksReset | IBooksUpdate

const booksReducer = (state: BooksState, action: Actions) => {
  const initialState = {books: []}
  switch (action.type) {
    case 'BOOKS_RESET':
      return initialState
    case 'BOOKS_UPDATE':
      const updatedBooks = state.books.slice()
      let originalBook =
        updatedBooks.find((book: Book) => book.id === action.book.id) || null
      if (!originalBook) {
        updatedBooks.push(action.book)
      } else {
        originalBook = Object.assign(originalBook, action.book)
      }
      update(action.book, action.book.shelf as ShelfType)
      return {books: updatedBooks}
    default:
      return state
  }
}

export default booksReducer
