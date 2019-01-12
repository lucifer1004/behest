import React from 'react'
import {makeStyles} from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {Book} from '../common/types'
import {shelfTypeToShelf} from '../helpers/BooksHelper'

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
  const classes = useStyles()
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card className={classes.card}>
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
            </Typography>
            <CardActions className={classes.buttons}>
              <Button size="small" color="primary" disabled>
                {shelfTypeToShelf(book.shelf || null)}
              </Button>
              <Button size="small" color="primary" variant="outlined">
                Share
              </Button>
              <Button size="small" color="primary" variant="contained">
                Mark as
              </Button>
            </CardActions>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookCard
