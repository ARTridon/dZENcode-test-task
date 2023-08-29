'use client';

import { IoIosArrowForward } from 'react-icons/io';
import { IoTrashSharp } from 'react-icons/io5';
import { TfiMenuAlt } from 'react-icons/tfi';

import { OrdersPrice } from '@/components/OrdersPage/OrdersPrice';
import { useOrderdDeleteAction } from '@/hooks/client-actions';
import { toggleCollapse } from '@/redux/slices/ordersSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { TOrdersAttributes } from '@/types/ordersType';
import { cn } from '@/utils/cn';

export const OrdersListItem = ({ order }: { order: TOrdersAttributes }) => {
  const dispatch = useAppDispatch();
  const { active, orderId } = useAppSelector(
    (state) => state.orderCollapseProductList
  );

  const { mutate: removeOrderById } = useOrderdDeleteAction();
  return (
    <div
      key={order.id}
      className={cn(
        'border-2 border-gray-300 rounded-md p-3 m-3 bg-white relative',
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
                  orderId: order.id,
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
        {active && orderId === order.id && (
          <div className='absolute top-0 bottom-0 right-0 w-10 flex items-center justify-center p-3 bg-gray-500 rounded-r-md'>
            <IoIosArrowForward className='text-white w-6 h-6 ' />
          </div>
        )}
      </div>
    </div>
  );
};