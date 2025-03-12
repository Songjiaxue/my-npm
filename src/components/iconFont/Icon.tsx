import React, { createElement, FC } from 'react';
import { IconBaseProps } from './type';
import './index.less';
type Props = Partial<IconBaseProps>;
const Icon: FC<Props> = ({ type, className = '', content, changeColors = [], onClick, onMouseDown, style }) => {
	const classname = `s_icon${className ? ' ' + className : ''}`;
	// content 存在且为svg字符串时， 进行svg标签创建并填充颜色
	// '<svg id="icon-alert" viewBox="0 0 1024 1024"><path d="M193 796c0 17.7 14.3 32 32 32h574c17.7 0 32-14.3 32-32V563c0-176.2-142.8-319-319-319S193 386.8 193 563v233z m72-233c0-136.4 110.6-247 247-247s247 110.6 247 247v193H404V585c0-5.5-4.5-10-10-10h-44c-5.5 0-10 4.5-10 10v171h-75V563zM216.9 310.5l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3l-67.9-67.9c-3.1-3.1-8.2-3.1-11.3 0l-39.6 39.6c-3.1 3.1-3.1 8.2 0 11.3l67.9 67.9c3.1 3.1 8.1 3.1 11.3 0zM886.5 231.3l-39.6-39.6c-3.1-3.1-8.2-3.1-11.3 0l-67.9 67.9c-3.1 3.1-3.1 8.2 0 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l67.9-67.9c3.1-3.2 3.1-8.2 0-11.3zM832 892H192c-17.7 0-32 14.3-32 32v24c0 4.4 3.6 8 8 8h688c4.4 0 8-3.6 8-8v-24c0-17.7-14.3-32-32-32zM484 180h56c4.4 0 8-3.6 8-8V76c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v96c0 4.4 3.6 8 8 8z"  ></path></svg>'
	if (content && typeof content === 'string' && /<svg([\s\S]*)<\/svg>/.test(content)) {
		// 获取svg标签id
		/id="(.*?)"/.exec(content);
		const id = RegExp.$1;
		// 获取svg标签viewBox
		/viewBox="(.*?)"/.exec(content);
		const viewBox = RegExp.$1;
		const pathEles = content
			// 提取所有的path
			.match(/<path([\s\S]*)<\/path>/g)[0]
			// 将path以~分隔
			.replace(/<\/path>/g, '</path>~')
			// 以~分隔为数组
			.split('~')
			.filter((v) => !!v)
			.map((v, i) => {
				// 获取path的d属性
				/d="(.*?)"/.exec(v);
				const d = RegExp.$1;
				// 获取path的fill属性
				/fill="(.*?)"/.exec(v);
				const color = RegExp.$1;
				// 创建path标签
				return createElement('path', {
					d,
					fill: changeColors[i] || color,
				});
			});
		// 创建svg标签，svg子元素path路径
		return createElement(
			'svg',
			{
				id,
				viewBox,
				className: classname,
				onClick,
				onMouseDown,
				style,
			},
			...pathEles,
		);
	}

	// 当content不存在或content为其它内容时
	return (
		<svg style={style} className={classname} aria-hidden onClick={onClick}>
			{content || <use xlinkHref={`#${type}`} />}
		</svg>
	);
};

export default React.memo(Icon);
