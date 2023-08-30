import { type FC } from 'react';

import { cn } from '@/utils/cn';

type TProductsAvailabilityProps = {
  availability: boolean;
};

export const ProductsAvailability: FC<TProductsAvailabilityProps> = ({
  availability,
}) => {
  return (
    <div
      className={cn(
        'w-4 h-4 rounded-full',
        availability ? 'bg-green-500' : ' bg-red-500'
      )}
    />
  );
};
