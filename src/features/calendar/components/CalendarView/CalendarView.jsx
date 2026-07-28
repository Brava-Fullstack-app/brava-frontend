import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import { calendarApi } from "../../services/calendarApi";
import styles from "./CalendarView.module.scss";
import { format } from "date-fns";

function CalendarView({ onDayClick }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    const fetchMonth = async () => {
      try {
        const year = selectedMonth.getFullYear();
        const month = selectedMonth.getMonth() + 1;
        const { data } = await calendarApi.getMonthOverview(year, month);
        setCalendarDays(data);
      } catch (err) {
        console.error("Error fetching calendar:", err);
      }
    };
    fetchMonth();
  }, [selectedMonth]);

  const hasDose = (date) => {
  const dateStr = format(date, "yyyy-MM-dd");
  const day = calendarDays.find((d) => d.date === dateStr);
  return day && day.scheduledDoses > 0;
};

const allCompleted = (date) => {
  const dateStr = format(date, "yyyy-MM-dd");
  const day = calendarDays.find((d) => d.date === dateStr);
  return (
    day && day.scheduledDoses > 0 && day.completedDoses === day.scheduledDoses
  );
};

  const rdpStyles = {
    root: {
      "--rdp-today-color": "#d71672",
      "--rdp-accent-color": "#d71672",
      "--rdp-accent-background-color": "#d71672",
    },
    caption_label: {
    textTransform: 'capitalize',
  },
    day_button: {
      fontFamily: "Inter, sans-serif",
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "1.25rem",
      borderRadius: "624.9375rem",
    },
    weekday: {
      color: "#62525A",
      fontFamily: "Inter, sans-serif",
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "1.25rem",
      opacity: 1,
    },
    chevron: {
      fill: "#d71672",
    },
  };

  return (
    <div className={styles.calendarWrapper}>
      <DayPicker
        mode="single"
        locale={es}
        selected={undefined}
        onDayClick={(date) => onDayClick?.(date)}
        month={selectedMonth}
        onMonthChange={setSelectedMonth}
        showOutsideDays
        styles={rdpStyles}
        classNames={{
          today: styles.today,
          outside: styles.outside,
        }}
        modifiers={{
          hasDose: (date) => hasDose(date),
          allCompleted: (date) => allCompleted(date),
        }}
        modifiersClassNames={{
          hasDose: styles.hasDose,
          allCompleted: styles.allCompleted,
        }}
      />
    </div>
  );
}

export default CalendarView;
