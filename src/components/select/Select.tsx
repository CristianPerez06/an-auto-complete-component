import { useState, useCallback, useEffect } from 'react'
import cn from 'classnames'

import { Option } from '../../types/types'

import { ReactComponent as ChevronDownIcon } from '../../assets/chevron-down.svg'
import styles from './Select.module.scss'

interface SelectProps {
  options: Option[]
  onChange?: (value: string) => void
  onSelect?: (option: Option) => void
  placeholder?: string
  isReadOnly?: boolean
}

type Comp = (props: SelectProps) => JSX.Element

export const Select: Comp = (props: SelectProps) => {
  const EMPTY_OPTION = { value: '', label: '' }

  const { options, onChange, onSelect, placeholder = 'Select an option', isReadOnly = true } = props
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(EMPTY_OPTION)
  const [inputText, setInputText] = useState('')

  const handleInputClick = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleOptionClick = useCallback((option: Option) => {
    setSelectedOption(option)
    setInputText(option.label)
    setIsOpen(false)

    onSelect?.(option)
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setIsOpen(true)
    setInputText(value)

    onChange?.(value)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      const currentText = inputText === '' ? '' : selectedOption.label
      const currentOption = inputText === '' ? EMPTY_OPTION : selectedOption

      setInputText(currentText)
      onSelect?.(currentOption)
      return
    }
  }, [isOpen])

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.inputContainer}>
        <input
          className={cn(styles.input, isReadOnly && styles.readOnly)}
          value={inputText}
          placeholder={placeholder}
          onChange={(e) => handleInputChange(e.currentTarget.value)}
          onClick={() => handleInputClick()}
          readOnly={isReadOnly}
        />
        <ChevronDownIcon
          className={cn(styles.chevron, isOpen && styles.rotate)}
          onClick={() => {
            setIsOpen((prev) => !prev)
          }}
        />
      </div>
      {isOpen && (
        <div className={styles.innerWrapper}>
          <ul className={styles.options}>
            {options.length === 0 ? (
              <li className={styles.noOptions} onClick={() => setIsOpen(false)}>
                No options
              </li>
            ) : (
              <>
                {options.map((option) => (
                  <li
                    key={option.value}
                    className={cn(styles.option, selectedOption.value === option.value && styles.isSelected)}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Select
