import { Dayjs } from "dayjs";

export enum Weeks {
  Monday = '一',
  Tuesday = '二',
  Wednesday = '三',
  Thursday = '四',
  Friday = '五',
  Saturday = '六',
  Sunday = '日',
}
export type Todos = { [key: string]: string[] };

export type CalendarTableProps = {
  todos?: Todos;
  currentMonth?: Dayjs;
  dateCallbak?: (date: string) => void;
  todoCallback?: (date: string, liIndex: number) => void;
};
