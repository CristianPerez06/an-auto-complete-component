import React, { useCallback, useEffect, useState } from 'react'
import Select from './select/Select'
import { Option } from '../../types/types'
import Alert, { Type as AlertType } from '../alert/Alert'

import styles from './Autocomplete.module.scss'

type Component = () => JSX.Element

const AutoComplete: Component = () => {
  const [optionsList, setOptionsList] = useState<Option[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const getData = async (value: string) => {
    const OPTIONS = [
      {
        value: '1',
        label: 'Here you can find the first option.',
      },
      { value: '2', label: 'This one is the second option.' },
      { value: '3', label: 'Last but not least, you have here the third option.' },
    ]

    const filteredOptions = OPTIONS.filter((o) => o.label.toLowerCase().includes(value.toLowerCase()))

    return filteredOptions
  }

  const handleInputChange = useCallback((value: string) => {
    setFilterValue(value)
  }, [])

  const handleSelection = useCallback(() => {
    setFilterValue('')
  }, [])

  useEffect(() => {
    setIsLoading(true)
    setError('')
    getData(filterValue)
      .then((data) => {
        setOptionsList(data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [filterValue])

  return (
    <div className={styles.container}>
      <Select
        options={optionsList.filter((o) => o.label.toLowerCase().includes(filterValue.toLowerCase()))}
        onChange={handleInputChange}
        onSelect={handleSelection}
        isReadOnly={false}
        isDisabled={isLoading || !!error}
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
