enum BookStatus {
  NULL,
  TO_READ,
  READING,
  READ,
}

interface ImageLink {
  smallThumbnail: string
  thumbnail: string
}

interface IndustryIdentifier {
  type: string
  identifier: string
}

interface ReadingModes {
  text: boolean
  image: boolean
}

export interface Book {
  allowAnonLogging?: boolean
  authors?: string[]
  averageRating?: number
  canonicalVolumeLink?: string
  categories?: string[]
  contentVersion?: string
  description?: string
  id: string
  imageLinks?: ImageLink
  industryIdentifiers?: IndustryIdentifier[]
  infoLink?: string
  language?: string
  maturityRating?: string
  pageCount?: number
  previewLink?: string
  printType?: string
  publishedDate?: string
  publisher?: string
  ratingsCount?: number
  readingModes?: ReadingModes
  status?: BookStatus
  subtitle?: string
  title?: string
}

export interface AppState {
  isLoading: boolean
  newBooks: Book[]
  booksToRead: Book[]
  booksRead: Book[]
  booksReading: Book[]
}

export interface BookItemProps {
  book: Book
}

export interface BookGridProps {
  books: Book[]
}

export interface ShelfProps {
  books: Book[]
  title: string
}
