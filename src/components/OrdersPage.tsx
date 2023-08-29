'use client';

import { AiFillPlusCircle } from 'react-icons/ai';

import { OrdersList } from '@/components/OrdersPage/OrdersList';
import { useOrdersGetAction } from '@/hooks/client-actions';

export const OrdersPage = () => {
  const { data: orders } = useOrdersGetAction();

  return (
    <section className='w-full flex items-start justify-center flex-col p-3'>
      <div className='my-10 ml-3 text-gray-800 text-3xl/tight font-bold	flex items-center justify-start gap-6'>
        <AiFillPlusCircle className='w-14 h-14 text-green-600' />
        Orders / {orders?.orders?.data?.length ?? 0}
      </div>

      {orders?.orders?.data?.length && (
        <OrdersList orders={orders?.orders?.data} />
      )}
    </section>
  );
};
