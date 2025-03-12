import dayjs from 'dayjs';
import React, { memo } from 'react';
import { calcCurrentDay, getDates } from './index.biz';
import { CalendarTableProps, Weeks } from './type';

const CalendarTablePanel = ({
  currentMonth = dayjs(),
  todos = {},
  dateCallbak,
  todoCallback,
}: CalendarTableProps) => {
  const dates = getDates(currentMonth);
  const weeks = Object.values(Weeks);
  const format = 'YYYY-MM-DD';
  const renderDay = (date: number, index: number) => {
    const { isToday, isDisabled, currentDay } = calcCurrentDay({
      curYear: currentMonth.year(),
      curMonth: currentMonth.month() + 1,
      index,
      day: date,
    });
    const currentDayString = currentDay.format(format);
    const item = todos[currentDayString];
    console.log(item, 'currentMonth');

    return (
      <div
        key={index}
        className={`calendar-table_date ${isDisabled ? 'disabled' : ''} ${isToday ? 'today' : ''}`}
      >
        <span
          className="calendar-table_day"
          onClick={() => {
            dateCallbak?.(currentDayString);
          }}
        >
          {date}
          {isToday && <span className="calendar-table_today">Today</span>}
        </span>
        {item && (
          <ul className="calendar-table_todos">
            {item.map((ite: string, idx: number) => (
              <li
                key={idx}
                className={`calendar-table_todos ${currentDay.isBefore(dayjs().subtract(1, 'd')) ? 'before' : ''}`}
                onClick={() => {
                  todoCallback?.(currentDayString, idx);
                }}
              >
                <>
                  <span className="calendar-table_todos_icon"></span>
                  <span className="line-through">{ite}</span>
                </>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  const renderWeek = (week: Weeks) => {
    return (
      <div
        className={`calendar-table_week ${[Weeks.Saturday, Weeks.Sunday].includes(week) ? 'rest' : ' '}`}
        key={week}
      >
        {week}
      </div>
    );
  };
  return (
    <>
      <div className="calendar-table_weeks">{weeks.map(renderWeek)}</div>
      <div className="calendar-table_dates">{dates.map(renderDay)}</div>
    </>
  );
};

export default memo(CalendarTablePanel);
