import { useState, useRef, useEffect } from 'react';
import styles from './Autocomplete.module.scss';

function Autocomplete({ id, label, required, placeholder, options, value, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes((value ?? '').toLowerCase())
  );

  function handleInputChange(event) {
    setIsOpen(true);
    onChange(event.target.value);
  }

  function handleSelectOption(option) {
    onChange(option.name);
    setIsOpen(false);
  }

  return (
    <div className={styles.field} ref={wrapperRef}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={`${styles.wrapper} ${error ? styles.wrapperError : ''}`}>
        <i className={`bi bi-search ${styles.icon}`}></i>
        <input
          id={id}
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={value ?? ''}
          onFocus={() => setIsOpen(true)}
          onChange={handleInputChange}
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul className={styles.dropdown} role="listbox">
          {filteredOptions.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                className={styles.option}
                onClick={() => handleSelectOption(option)}
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}

export default Autocomplete;