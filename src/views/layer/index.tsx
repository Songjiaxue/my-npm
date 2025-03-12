import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './index.less';

const Layer = () => {
	return (
		<div className='npm-layer'>
			<ul>
				<li>
					<NavLink to='/calendarTable'>Calendar Table</NavLink>
				</li>
				<li>
					<NavLink to='/iconFont'>Custom Iconfont</NavLink>
				</li>
			</ul>
			<section className='npm-main'>
				<Outlet />
			</section>
		</div>
	);
};

export default Layer;
