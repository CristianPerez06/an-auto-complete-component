import React from 'react'
import AutoComplete from './components/autocomplete/AutoComplete'

import styles from './App.module.scss'

type Component = () => JSX.Element

const App: Component = () => {
  return (
    <div className={styles.app}>
      <AutoComplete />
    </div>
  )
}

export default App
