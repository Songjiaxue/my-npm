import Layer from '@views/layer';
import React from 'react';
const ViewCalendarTable = React.lazy(() => import('@views/calendarTable'));
const ViewIconFont = React.lazy(() => import('@views/iconFont'));

const RouterChildrenConfigs = [
	{
		index: true,
		element: <ViewCalendarTable />,
	},
	{
		path: 'calendarTable',
		element: <ViewCalendarTable />,
	},
	{
		path: 'iconFont',
		element: <ViewIconFont />,
	},
];

const RouterConfig = [
	{
		path: '/',
		element: <Layer />,
		children: RouterChildrenConfigs,
	},
];

export { RouterChildrenConfigs };

export default RouterConfig;
