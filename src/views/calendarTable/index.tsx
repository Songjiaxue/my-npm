import CalendarTable from '@components/calendarTable';
import React, { ReactNode } from 'react';

const ViewCalendarTable = (): ReactNode => {
	return (
		<div>
			<CalendarTable
				todos={{
					'2025-03-10': ['test', 'hello'],
					'2025-03-24': ['test', 'hello'],
				}}
			/>
		</div>
	);
};

export default ViewCalendarTable;
