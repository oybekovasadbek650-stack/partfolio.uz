import { useState, useRef, useEffect, useId } from 'react'
import { IoChevronDown, IoCheckmark } from 'react-icons/io5'
import styles from './CategoryDropdown.module.scss'

function CategoryDropdown({ options, value, onChange, label = 'Kategoriya' }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const triggerRef = useRef(null)
  const listRef = useRef(null)
  const listId = useId()

  const selected = options.find((o) => o.value === value) ?? options[0]

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    listRef.current?.querySelector('[aria-selected="true"]')?.focus()

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const choose = (optionValue) => {
    onChange(optionValue)
    setOpen(false)
    triggerRef.current?.focus()
  }

  const handleListKeyDown = (e) => {
    const items = [...listRef.current.querySelectorAll('[role="option"]')]
    const index = items.indexOf(document.activeElement)

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      items[Math.min(index + 1, items.length - 1)]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      items[Math.max(index - 1, 0)]?.focus()
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (index >= 0) choose(options[index].value)
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  const handleTriggerKeyDown = (e) => {
    if (e.key === 'ArrowDown' && !open) {
      e.preventDefault()
      setOpen(true)
    }
  }

  return (
    <div ref={wrapRef} className={styles.dropdown}>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
      >
        <span className={styles.label}>{selected.label}</span>
        <IoChevronDown className={styles.chevron} aria-hidden="true" />
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-label={label}
        className={`${styles.list} ${open ? styles.listOpen : ''}`}
        onKeyDown={handleListKeyDown}
      >
        {options.map((option) => {
          const isSelected = option.value === selected.value
          return (
            <li
              key={option.value}
              role="option"
              aria-selected={isSelected}
              tabIndex={-1}
              className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
              onClick={() => choose(option.value)}
            >
              <span>{option.label}</span>
              {isSelected && <IoCheckmark aria-hidden="true" />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryDropdown