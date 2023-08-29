'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { IoTrashSharp } from 'react-icons/io5';
import { TfiMenuAlt } from 'react-icons/tfi';

import { OrdersPrice } from '@/components/OrdersPage/OrdersPrice';
import { Api } from '@/graphQl';
import { toggleCollapse } from '@/redux/slices/ordersSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { cn } from '@/utils/cn';

import { TOrdersAttributes} from '@/types/ordersType';

export const OrdersListItem = ({ order }:{order:TOrdersAttributes}) => {
  const queryCache = useQueryClient();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { active } = useAppSelector((state) => state.orderCollapseProductList);

  const { mutate: removeOrderById } = useMutation(
    ({ id }: { id: string }) =>
      Api.orders.deleteOrder({ id, jwt: session?.jwt as string }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries({ queryKey: ['orders'] });
      },
      onError: (error) => console.log(error),
    }
  );
  return (
    <div
      key={order.id}
      className={cn(
        'border-2 border-gray-300 rounded-md p-3 m-3',
        active && 'flex items-center justify-between'
      )}
    >
      <div className='flex items-center justify-around pr-[1%] text-[#135164]'>
        {!active && (
          <h3 className='underline tracking-widest line-clamp-2 text-ellipsis max-w-[12rem] min-w-[12rem]'>
            {order.attributes.title}
          </h3>
        )}

        <div className='flex items-center'>
          <div
            className='flex items-center w-8 h-8 rounded-full ring-2 p-1 ring-gray-400 cursor-pointer'
            onClick={() =>
              dispatch(
                toggleCollapse({
                  active: true,
                  products: order.attributes.products.data,
                  orderTitle: order.attributes.title,
                })
              )
            }
          >
            <TfiMenuAlt className='w-full h-full text-gray-500' />
          </div>
          <div className='flex flex-col pl-5'>
            <h1 className='text-lg'>{order.attributes.products.data.length}</h1>
            <p className='text-xs text-[#9fb0b7]'>Products</p>
          </div>
          {!active && (
            <div className='flex flex-col pl-5'>
              {/* <h1 className='text-lg'>{order.attributes.createdAt}</h1> */}
            </div>
          )}
        </div>
        {!active && (
          <>
            <OrdersPrice products={order.attributes.products.data} />
            <IoTrashSharp
              className='w-4 h-4 cursor-pointer text-gray-500'
              onClick={() => {
                removeOrderById({ id: order.id });
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
