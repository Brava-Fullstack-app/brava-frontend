import { useState, useRef, useEffect, useMemo } from "react";
import styles from "./TimePicker.module.scss";

function generateTimeOptions(maxTime) {
  const [maxH, maxM] = maxTime.split(":").map(Number);
  const options = [];
  for (let h = maxH; h >= 0; h--) {
    const maxMinute = h === maxH ? maxM : 59;
    for (let m = maxMinute; m >= 0; m--) {
      options.push({
        value: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
        label: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
      });
    }
  }
  return options;
}

function TimePicker({ value, onChange, maxTime: maxTimeProp }) {
  const now = useMemo(() => new Date(), []);
  const defaultMax = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const maxTime = maxTimeProp || defaultMax;

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const options = useMemo(() => generateTimeOptions(maxTime), [maxTime]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(optionValue) {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  }

  const displayValue = value || maxTime;

  return (
    <div className={styles.field} ref={wrapperRef}>
      <div
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
      >
        <span className={styles.value}>{displayValue}</span>
        <i className={`bi bi-chevron-down ${styles.chevron}`}></i>
      </div>

      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`${styles.option} ${option.value === displayValue ? styles.optionSelected : ""}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TimePicker;