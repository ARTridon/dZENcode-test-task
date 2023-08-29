'use client';

import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Clock } from '@/components/Layout/Clock';

export const DateAndTime = () => {
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const weekday = date.format('dddd');
  const dateString = date.format('D MMMM YYYY');
  const time = date.format('HH:mm');

  return (
    <div className='flex justify-around items-end gap-11'>
      <div>
        <p>{weekday}</p>
        <p>{dateString}</p>
      </div>
      <Clock time={time} />
    </div>
  );
};
