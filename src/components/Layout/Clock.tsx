

export const Clock = ({ time }: { time: string }) => {
  return (
    <div className='flex gap-1 stroke-green-500 '>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        className='w-6 h-6 font-bold'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
      <p className='items-baseline'>{time}</p>
    </div>
  );
};
