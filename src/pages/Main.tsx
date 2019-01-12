import React from 'react'
import {Link} from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress'
import {AppState} from '../common/types'
import Shelf from '../components/Shelf'

const Main: React.FunctionComponent<AppState> = ({isLoading, books}) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    {isLoading ? <LinearProgress /> : null}
    <div className="list-books-content">
      <Shelf books={books} title="Want to read" type="wantToRead" />
      <Shelf books={books} title="Current reading" type="currentlyReading" />
      <Shelf books={books} title="Read" type="read" />
    </div>
    <div className="open-search">
      <Link to="/search">
        <button>Add a book</button>
      </Link>
    </div>
  </div>
)

export default Main
