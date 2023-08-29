'use client';

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

export const OrdersList = ({ orders }: TOrdersListProps) => {
  const dispatch = useAppDispatch();
  const { active } = useAppSelector((state) => state.orderCollapseProductList);

  return (
    <div className={cn('w-full', active && 'grid grid-cols-3 p-6')}>
      <div className={cn(active && 'max-w-sm')}>
        {orders?.map((order) => <OrdersListItem order={order} key={order.id} />)}
      </div>
      {active && (
        <div className='border-2 border-gray-300 rounded-xl  m-3 relative w-full col-span-2 bg-white'>
          <GrClose
            className='absolute -top-2 -right-2 w-10 h-10 p-3 cursor-pointer bg-white rounded-full'
            onClick={() =>
              dispatch(
                toggleCollapse({ active: false, products: [], orderTitle: '' })
              )
            }
          />
          <OrdersProductsList />
        </div>
      )}
    </div>
  );
};
