import React, { useCallback, useEffect, useState } from 'react'
import Select from './select/Select'
import { Option, Post } from '../../types/types'
import Alert, { Type as AlertType } from '../alert/Alert'

import styles from './Autocomplete.module.scss'
import useDebounce from '../../hooks/useDebounce'

type Component = () => JSX.Element

const AutoComplete: Component = () => {
  const [optionsList, setOptionsList] = useState<Option[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const debouncedFilterValue = useDebounce(filterValue, 500)

  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts: Post[] = await response.json()

    // Map Posts to Options
    const mappedOptions: Option[] = posts.map((posts) => {
      return {
        value: posts.id.toString(),
        label: posts.title,
      }
    })

    return mappedOptions
  }

  // Handle input change
  const handleInputChange = useCallback((value: string) => {
    setFilterValue(value)
  }, [])

  // Handle option selected
  const handleSelection = useCallback(() => {
    setFilterValue('')
  }, [])

  useEffect(() => {
    // Cleanup old state
    setIsLoading(true)
    setError('')

    // Fetch options
    fetchData()
      .then((data) => {
        const filteredOptions = data.filter((o) => o.label.toLowerCase().includes(filterValue.toLowerCase()))
        setOptionsList(filteredOptions)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [debouncedFilterValue])

  return (
    <div className={styles.container}>
      <Select
        options={optionsList.filter((o) => o.label.toLowerCase().includes(filterValue.toLowerCase()))}
        onChange={handleInputChange}
        onSelect={handleSelection}
        isReadOnly={false}
        isDisabled={!!error}
      />
      {isLoading && <div className={styles.loading}>Loading...</div>}
      {error && (
        <Alert
          type={AlertType.DANGER}
          className={styles.alertMargin}
          text={'Oops... Something went wrong. Please try again.'}
        />
      )}
    </div>
  )
}

export default AutoComplete
