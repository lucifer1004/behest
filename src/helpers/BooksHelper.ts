import {ShelfType} from '../common/types'

export const shelfTypeToShelf = (shelfType: ShelfType | null): string => {
  switch (shelfType) {
    case 'currentlyReading':
      return 'Reading'
    case 'read':
      return 'Read'
    case 'wantToRead':
      return 'To read'
    default:
      return 'Not added yet'
  }
}
