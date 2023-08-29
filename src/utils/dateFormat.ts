import dayjs from 'dayjs';

export const dateFormat = (date: string, format: string) =>
  dayjs(date).format(format);
