'use client';

import { type FC } from 'react';

import { GrClose } from 'react-icons/gr';

import { OrdersListItem } from '@/components/OrdersPage/OrdersListItem';
import { OrdersProductsList } from '@/components/OrdersPage/OrdersProductsList';
import { toggleCollapse } from '@/redux/slices/ordersSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { TOrdersAttributes } from '@/types/ordersType';
import { cn } from '@/utils/cn';

type TOrdersListProps = {
  orders: TOrdersAttributes[];
};

export const OrdersList: FC<TOrdersListProps> = ({ orders }) => {
  const dispatch = useAppDispatch();
  const { active } = useAppSelector((state) => state.orderCollapseProductList);

  return (
    <div className={cn('w-full', active && 'flex items-start justify-start')}>
      <table
        className={cn(
          'text-lime-900 w-full table-auto border-spacing-y-4 border-separate ',
          active && 'max-w-sm'
        )}
      >
        <tbody>
          {orders?.map((order) => (
            <OrdersListItem order={order} key={order.id} />
          ))}
        </tbody>
      </table>
      {active && (
        <div className='border-2 border-b-0 border-gray-300 rounded mt-4  mx-3 relative w-full col-span-2 bg-white'>
          <GrClose
            className='absolute -top-3 -right-3 w-10 h-10 p-3 cursor-pointer bg-white rounded-full shadow-lg'
            onClick={() =>
              dispatch(
                toggleCollapse({
                  active: false,
                  products: [],
                  orderTitle: '',
                  orderId: '',
                })
              )
            }
          />
          <OrdersProductsList />
        </div>
      )}
    </div>
  );
};
