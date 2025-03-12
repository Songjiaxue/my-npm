import dayjs, { Dayjs } from 'dayjs';

export function getDates(curDay: Dayjs) {
  console.log(curDay, dayjs(), '=====');
  const date: Dayjs = dayjs(curDay.format('YYYY-MM-DD'));
  const curMonthDays: number = date.daysInMonth(); // 获取当月天数
  const curWeekday: number = date.date(1).day() || 7; // 获取当月1日为星期几
  const lastMonthDays: number = date.subtract(1, 'month').daysInMonth(); // 获取上月天数
  const cols: number = 7 * 6;
  const days = Array.from(new Array(curMonthDays), (v, k) => k + 1); // 生成当月天数的数组
  // 将上月天数补足 上月天数 - 当月1日为星期数 - i
  for (let i = curWeekday; i > 1; i -= 1) {
    days.unshift(lastMonthDays - (curWeekday - i));
  }
  // 将下月天数补足 i
  if (days.length % 7) {
    for (let i = 1; i <= days.length % 7; i += 1) {
      days.push(i);
    }
  }
  // 除中国外第一位是星期天， 需要再补一天
  // if (locale !== 'zh_cn') {
  // days.unshift(days[0] > 20 ? days[0] - 1 : lastMonthDays);
  // }
  // 不足6排补足
  if (days.length < cols) {
    const colsEnd = days[days.length - 1];
    const length = cols - days.length;
    for (let i = 1; i <= length; i += 1) {
      days.push(colsEnd > 20 ? i : colsEnd + i);
    }
  }
  // 补足一天之后会出现超过6排的现象
  return days.slice(0, cols);
}

export function calcCurrentDay({
  curYear,
  curMonth,
  index,
  day,
}: {
  curYear: number;
  curMonth: number;
  index: number;
  day: number;
}) {
  console.log(curYear, curMonth, day, '====');
  let currentDay: Dayjs; // 当前代表的时间
  let isToday = false; // 是否是今天
  let isDisabled = false;
  // 上月
  if (index <= 7 && day > 20) {
    const prevMonth = dayjs(`${curYear}-${curMonth}`)
      .subtract(1, 'month')
      .format('MM');
    currentDay = dayjs(`${curYear}-${prevMonth}-${day}`);
    isDisabled = true;
  }
  // 下月
  else if (index > 20 && day <= 14) {
    const nextMonth = dayjs(`${curYear}-${curMonth}`)
      .add(1, 'month')
      .format('MM');
    currentDay = dayjs(`${curYear}-${nextMonth}-${day}`);
    isDisabled = true;
  } else {
    currentDay = dayjs(`${curYear}-${curMonth}-${day}`);
  }
  console.log(
    currentDay.format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD'),
    '======'
  );

  isToday = currentDay.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
  return {
    currentDay,
    isToday,
    isDisabled,
  };
}
