'use client';

import { type FC } from 'react';

import { dateFormat } from '@/utils/dateFormat';

type TGuaranteeFromTo = {
  start: string;
  end: string;
};

export const GuaranteeFromTo: FC<TGuaranteeFromTo> = ({ start, end }) => {
  return (
    <div className='flex flex-col items-start justify-center'>
      <div className='flex gap-3 text-[#93a6b0] items-start'>
        <p className='text-sm'>from:</p>
        <p className='text-lime-900 text-sm'>
          {dateFormat(start, 'YYYY-MM-DD HH:mm:ss')}
        </p>
      </div>
      <div className='flex gap-3 text-[#93a6b0] items-start'>
        <p className='text-sm'>to:</p>
        <p className='text-lime-900 text-sm'>{dateFormat(end, 'YYYY-MM-DD')}</p>
      </div>
    </div>
  );
};
