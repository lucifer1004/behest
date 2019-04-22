import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Dialog from '@material-ui/core/Dialog'
import Fab from '@material-ui/core/Fab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import {Book, ShelfType} from '../common/types'
import {shelfTypeToShelf} from '../helpers/BooksHelper'
import BooksDispatch from '../contexts/BooksDispatch'
import BackIcon from './BackIcon'
import HomeIcon from './HomeIcon'

const useStyles = makeStyles({
  card: {
    margin: '2% 5%',
    padding: 10,
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
  },
  content: {
    width: '100%',
    display: 'flex',
    flex: 1,
    padding: 10,
    'flex-direction': 'row',
    'justify-content': 'space-between',
    '@media screen and (max-width: 1100px), screen and (max-height: 800px)': {
      'flex-direction': 'column',
    },
  },
  media: {
    width: 128,
    height: 193,
    margin: 30,
  },
  buttons: {
    width: 250,
    'align-self': 'flex-end',
  },
})

const BookCard = ({book}: {book: Book}) => {
  const [dialogOpen, setDialog] = useState(false)
  const [shareSuccess, setShareStatus] = useState(false)
  const classes = useStyles()
  const dispatch = useContext(BooksDispatch)

  /**
   * Handle clicking `Mark as` button
   */
  const handleMark = () => {
    setDialog(true)
  }

  /**
   * Handle choosing new bookshelf
   */
  const handleClose = (shelfType: ShelfType) => {
    setDialog(false)
    dispatch({type: 'BOOKS_UPDATE', book: {id: book.id, shelf: shelfType}})
    book.shelf = shelfType
  }

  /**
   * Handle sharing
   */
  const handleShare = () => {
    let clonedNavigator: any = window.navigator
    if (clonedNavigator && clonedNavigator.clipboard) {
      clonedNavigator.clipboard.writeText(window.location.href).then(() => {
        setShareStatus(true)
      })
    } else {
      return false
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card className={classes.card}>
        <div
          style={{
            alignSelf: 'flex-start',
            display: 'flex',
            padding: 5,
          }}
        >
          <div style={{padding: 5}}>
            <Link to="/">
              <Fab color="primary" aria-label="Home">
                <HomeIcon />
              </Fab>
            </Link>
          </div>
          <div style={{padding: 5}}>
            <Fab
              color="primary"
              aria-label="Back"
              onClick={() => {
                window.history.back()
              }}
            >
              <BackIcon />
            </Fab>
          </div>
        </div>
        <CardContent
          style={{
            fontSize: 10,
          }}
        >
          <Typography gutterBottom variant="h2">
            {book.title}
          </Typography>
          <CardContent className={classes.content}>
            <CardMedia
              className={classes.media}
              image={
                book.imageLinks
                  ? book.imageLinks.thumbnail
                  : 'https://images.unsplash.com/photo-1469827160215-9d29e96e72f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
              }
              title={book.title}
            />
            <Typography variant="h6">
              {book.authors && book.authors.length > 1 ? 'Authors' : 'Author'}:{' '}
              {book.authors ? book.authors.join(', ') : null}
              <hr />
              Rating:{' '}
              {book.averageRating
                ? '❤️'.repeat(Math.round(book.averageRating))
                : 'Unknown'}
              <hr />
              Pages: {book.pageCount || 'Unknown'}
              <hr />
              Categories:{' '}
              {book.categories ? book.categories.join(', ') : 'Unknown'}
            </Typography>
            <CardActions className={classes.buttons}>
              <Button size="small" color="primary" disabled>
                {shelfTypeToShelf(book.shelf || null)}
              </Button>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={handleShare}
              >
                Share
              </Button>
              <Dialog open={shareSuccess} onClick={() => setShareStatus(false)}>
                <Typography variant="h6">
                  Share link has been copied to your clipboard
                </Typography>
              </Dialog>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={handleMark}
              >
                Mark as
              </Button>
              <Dialog aria-labelledby="simple-dialog-title" open={dialogOpen}>
                <List>
                  <Typography variant="h6">Mark this book as...</Typography>
                  <ListItem button onClick={() => handleClose('wantToRead')}>
                    <Typography variant="body1">Want to read</Typography>
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => handleClose('currentlyReading')}
                  >
                    <Typography variant="body1">Currently reading</Typography>
                  </ListItem>
                  <ListItem button onClick={() => handleClose('read')}>
                    <Typography variant="body1">Read</Typography>
                  </ListItem>
                </List>
              </Dialog>
            </CardActions>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookCard
