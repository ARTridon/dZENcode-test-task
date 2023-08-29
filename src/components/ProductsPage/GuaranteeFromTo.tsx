'use client';

import { dateFormat } from '@/utils/dateFormat';

export const GuaranteeFromTo = ({
  start,
  end,
}: {
  start: string;
  end: string;
}) => {
  return (
    <div className='flex flex-col items-start justify-center'>
      <div className='flex gap-3 text-[#93a6b0] items-start'>
        <p className='text-sm'>from:</p>
        <p className='text-[#2e3e45] text-sm'>{dateFormat(start,'YYYY-MM-DD HH:mm:ss')}</p>
      </div>
      <div className='flex gap-3 text-[#93a6b0] items-start'>
        <p className='text-sm'>to:</p>
        <p className='text-[#2e3e45] text-sm'>{dateFormat(end,'YYYY-MM-DD')}</p>
      </div>
    </div>
  );
};
