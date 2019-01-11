import React from 'react'
import {BrowserRouter, Link} from 'react-router-dom'
import {AppState} from './common/types'
import {get, getAll, update, search} from './helpers/BooksAPI'
import Shelf from './components/Shelf'
import './App.css'

class BooksApp extends React.PureComponent<{}, AppState> {
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
    console.log(location.href.split('/').reverse()[0])
    return (
      <div className="app">
        {location.href.split('/').reverse()[0] === 'search' ? (
          <div className="search-books">
            <div className="search-books-bar">
              <BrowserRouter>
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
              </BrowserRouter>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.isLoading ? (
                  <Shelf books={this.state.newBooks} title="New books" />
                ) : (
                  <Shelf books={[]} title="Loading new books..." />
                )}
              </div>
              <Shelf books={this.state.booksToRead} title="Want to read" />
              <Shelf books={this.state.booksReading} title="Current reading" />
              <Shelf books={this.state.booksRead} title="Read" />
            </div>
            <BrowserRouter>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </BrowserRouter>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
