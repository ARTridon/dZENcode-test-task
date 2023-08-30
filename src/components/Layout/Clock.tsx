import { type FC } from 'react';

import { LuClock9 } from 'react-icons/lu';

type TClockProps = {
  time: string;
};

export const Clock: FC<TClockProps> = ({ time }) => {
  return (
    <div className='flex gap-1 stroke-green-500'>
      <LuClock9 className='w-6 h-6 text-green-500' />
      <p className='items-baseline'>{time}</p>
    </div>
  );
};
