import { Suspense } from 'react';

import { BiCheckShield } from 'react-icons/bi';

import { DateAndTime } from '@/components/Layout/DateAndTime';
import { SessionsCount } from '@/components/Layout/SessionsCount';

export const TopMenu = () => {
  return (
    <header className='w-full  flex justify-around items-center shadow-md col-span-12 py-4 max-h-min'>
      <div className='flex items-center gap-5 text-green-500 stroke-green-500 font-bold'>
        <BiCheckShield className='w-12 h-12' />
        <h1>INVENTORY</h1>
      </div>

      <SessionsCount />

      <DateAndTime />
    </header>
  );
};
