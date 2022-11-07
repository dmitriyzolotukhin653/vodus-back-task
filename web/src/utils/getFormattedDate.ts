import dayjs from "dayjs";

export const getFormattedDate = (value?: string | number) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return dayjs(1000 * 1000 * value).format('YYYY-MM-DD');
}