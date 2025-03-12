#### 用途

生成每月计划表，之前的日期待做事项会自动添加删除线。

![Calendar Table](https://raw.githubusercontent.com/Songjiaxue/images-collect/refs/heads/main/calendar-table.png 'Calendar Table')

#### 使用方法

```jsx
import { CalendarTable } from 'calendar-table';
import 'calendar-table/dist/index.min.css';

export default function Home() {
	const defaultItems = {
		'2025-03-06': ['hello, i want to off work', 'hello, i want to off work222'],
		'2025-03-04': ['hello, i want to off work1'],
	};
	return (
		<div className='h-[100vh] p-[20px]'>
			<CalendarTable todos={defaultItems} />
		</div>
	);
}
```

#### API 文档

| 参数         | 说明             | 类型                                    | 默认值  |
| ------------ | ---------------- | --------------------------------------- | ------- |
| currentMonth | 当前月份         | Dayjs                                   | dayjs() |
| todos        | 待办事项         | { [key: string]: string[] }             |         |
| todoCallback | 待办事项回调函数 | (date: string, liIndex: number) => void |         |
| dateCallbak  | 日期回调函数     | (date: string) => void                  |         |
