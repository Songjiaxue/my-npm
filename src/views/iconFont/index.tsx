import Icon from '@components/iconFont';
import React, { ReactNode, useEffect } from 'react';
import './index.less';

const ViewIconFont = (): ReactNode => {
	useEffect(() => {
		Icon.createIcon('//at.alicdn.com/t/c/font_4853833_7mstr615ndg.js');
	}, []);

	return (
		<div className='npm-iconfont'>
			<Icon type='s-add' />
		</div>
	);
};

export default ViewIconFont;
