import { useState, useCallback, useEffect } from 'react'
import { Option } from '../../../types/types'
import { ReactComponent as ChevronDownIcon } from '../../../assets/chevron-down.svg'
import { OptionLabel } from './OptionLabel'

import cn from 'classnames'
import styles from './Select.module.scss'

interface SelectProps {
  // A list of options to be displayed when component is open
  options: Option[]
  // Action triggered when user types in a value
  onChange?: (value: string) => void
  // Action triggered when an option is selected
  onSelect?: () => void
  // A string that temporarily takes the place of the input text/selected option text.
  placeholder?: string
  // Enables/disables the ability to type in a text.
  isReadOnly?: boolean
  // Enables/disables the ability to interact with the input.
  isDisabled?: boolean
}

type Comp = (props: SelectProps) => JSX.Element

export const Select: Comp = (props: SelectProps) => {
  const EMPTY_OPTION = { value: '', label: '' }

  const { options, onChange, onSelect, placeholder = 'Select an option', isReadOnly = true, isDisabled = false } = props
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(EMPTY_OPTION)
  const [inputText, setInputText] = useState('')

  // Handle input click
  const handleInputClick = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  // Handle option click
  const handleOptionClick = useCallback((option: Option) => {
    setSelectedOption(option)
    setInputText(option.label)
    setIsOpen(false)

    onSelect?.()
  }, [])

  // Handle input change
  const handleInputChange = useCallback((value: string) => {
    setIsOpen(true)
    setInputText(value)

    onChange?.(value)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      // When Select is closed - If no text is typed in then use selected option text
      const currentText = inputText === '' ? '' : selectedOption.label

      setInputText(currentText)
      onSelect?.()
      return
    }
  }, [isOpen])

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.inputContainer}>
        <input
          className={cn(styles.input, isReadOnly && styles.readOnly, isDisabled && styles.disabled)}
          value={inputText}
          placeholder={placeholder}
          onChange={(e) => handleInputChange(e.currentTarget.value)}
          onClick={() => handleInputClick()}
          readOnly={isReadOnly}
          disabled={isDisabled}
        />
        <ChevronDownIcon
          className={cn(styles.chevron, isOpen && styles.rotate, isDisabled && styles.disabled)}
          onClick={() => {
            if (isDisabled) {
              return
            }
            setIsOpen((prev) => !prev)
          }}
        />
      </div>
      {isOpen && (
        <div className={styles.innerWrapper}>
          <ul className={styles.options}>
            {options.length === 0 ? (
              <li className={styles.noOptions} onClick={() => setIsOpen(false)}>
                No options available
              </li>
            ) : (
              <>
                {options.map((option) => (
                  <li
                    key={option.value}
                    className={cn(styles.option, selectedOption.value === option.value && styles.isSelected)}
                    onClick={() => handleOptionClick(option)}
                  >
                    {/* If readOnly is true then there's no need to highlight the text */}
                    {isReadOnly ? option.label : <OptionLabel labelText={option.label} searchText={inputText} />}
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
