import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import {AppState} from './common/types'
import {get, getAll, update, search} from './helpers/BooksAPI'
import Shelf from './components/Shelf'
import SearchBox from './components/SearchBox'
import './App.css'

const Main: React.FunctionComponent<AppState> = ({
  isLoading,
  newBooks,
  booksToRead,
  booksReading,
  booksRead,
}) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        {isLoading ? (
          <Shelf books={newBooks} title="New books" />
        ) : (
          <Shelf books={[]} title="Loading new books..." />
        )}
      </div>
      <Shelf books={booksToRead} title="Want to read" />
      <Shelf books={booksReading} title="Current reading" />
      <Shelf books={booksRead} title="Read" />
    </div>
    <div className="open-search">
      <Link to="/search">
        <button>Add a book</button>
      </Link>
    </div>
  </div>
)

class BooksApp extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      isLoading: false,
      newBooks: [],
      booksToRead: [],
      booksRead: [],
      booksReading: [],
    }
  }

  componentWillMount() {
    /**
     * Fetch new books
     */
    getAll().then(books => {
      this.setState(
        {
          newBooks: books,
        },
        () => {
          this.setState({
            isLoading: true,
          })
        },
      )
    })

    const localBooks = localStorage.getItem('local-books')
    if (!localBooks) {
      search('Android').then(books => {
        this.setState({
          booksToRead: books,
        })
        localStorage.setItem('local-books', JSON.stringify(books))
      })
    } else {
      this.setState({
        booksToRead: JSON.parse(localBooks),
      })
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route path="/search" component={SearchBox} />
            <Route path="/" render={() => <Main {...this.state} />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
