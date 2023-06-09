import { useState, useCallback, useEffect, useRef } from 'react'
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

  const outerWrapper = useRef<HTMLDivElement>(null)

  // Handle outside click
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Node | null
      if (outerWrapper.current && !outerWrapper.current.contains(target)) {
        setIsOpen(false)
      }
    },
    [inputText]
  )

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

  // Handle arrow icon click
  const handleArrowIconClick = useCallback(() => {
    if (isDisabled) {
      return
    }
    setIsOpen((prev) => !prev)
  }, [isDisabled])

  // Handle no options click
  const handleNoOptionsClick = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      // When Select is closed - If no text is typed in then use selected option text
      const currentText = inputText === '' ? '' : selectedOption.label

      setInputText(currentText)
      onSelect?.()
      return
    }

    // Add click outside handler
    document.addEventListener('mousedown', handleClickOutside)

    // Cleanup - Remove click outside handler
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={outerWrapper} className={styles.outerWrapper}>
      <div className={styles.inputContainer}>
        <input
          className={cn(styles.input, isReadOnly && styles.readOnly, isDisabled && styles.disabled)}
          value={inputText}
          placeholder={placeholder}
          onChange={(e) => handleInputChange(e.currentTarget.value)}
          onClick={handleInputClick}
          readOnly={isReadOnly}
          disabled={isDisabled}
        />
        <ChevronDownIcon
          className={cn(styles.chevron, isOpen && styles.rotate, isDisabled && styles.disabled)}
          onClick={handleArrowIconClick}
        />
      </div>
      {isOpen && (
        <div className={styles.innerWrapper}>
          <ul className={styles.options}>
            {options.length === 0 ? (
              <li className={cn(styles.noOptions, styles.option)} onClick={handleNoOptionsClick}>
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
