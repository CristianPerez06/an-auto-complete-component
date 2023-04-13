import { Fragment } from 'react'

import styles from './OptionLabel.module.scss'

interface OptionLabelProps {
  // Text to be displayed
  labelText: string
  // Text typed in by the user
  searchText: string
}

type Comp = (props: OptionLabelProps) => JSX.Element

export const OptionLabel: Comp = (props: OptionLabelProps) => {
  const { labelText, searchText } = props

  const regex = new RegExp(`(${searchText})`, 'gi')
  const arr = labelText.split(regex)

  // If there is no search text then return the label text as it is
  if (!searchText) {
    return <>{labelText}</>
  }

  // If there is a search text then highlight the matching text
  return (
    <>
      {arr.map((item, index) => {
        // Current text matches the searchText
        if (item.toLowerCase() == searchText.toLowerCase()) {
          return (
            <span key={index} className={styles.highlight}>
              {item}
            </span>
          )
        }

        // Current text does not match the searchText
        return <Fragment key={index}>{item}</Fragment>
      })}
    </>
  )
}
