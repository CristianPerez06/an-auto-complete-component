import React from 'react'

import styles from './App.module.scss'

import Select from './components/select/Select'
import { Option } from './types/types'

type Component = () => JSX.Element

const App: Component = () => {
  const OPTION = { value: '2', label: 'This one is the second option.' }
  const OPTIONS = [
    {
      value: '1',
      label: 'Here you can find the first option.',
    },
    OPTION,
    { value: '3', label: 'Last but not least, you have here the third option.' },
  ]

  const handleInputChange = (value: string) => {
    console.log('Input change')
  }

  const handleSelection = (option: Option) => {
    console.log('Option selected')
  }

  return (
    <div className={styles.app}>
      <div className={styles.example}>
        <Select options={OPTIONS} isReadOnly={false} onChange={handleInputChange} onSelect={handleSelection} />
      </div>
    </div>
  )
}

export default App
