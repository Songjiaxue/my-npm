import React from 'react';
import CalendarTablePanel from './panel';
import './styles/index.less';
import { CalendarTableProps } from './type';

const CalendarTable: React.FC<CalendarTableProps> = ({
  todos,
  currentMonth,
  dateCallbak,
  todoCallback,
}) => {
  return (
    <div className="calendar-table_container">
      <CalendarTablePanel
        currentMonth={currentMonth}
        todos={todos}
        todoCallback={todoCallback}
        dateCallbak={dateCallbak}
      />
    </div>
  );
};

export default CalendarTable;
