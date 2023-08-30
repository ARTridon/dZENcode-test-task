'use client';

import {type FC, useEffect, useState } from 'react';

import { IoIosArrowForward } from 'react-icons/io';
import { IoTrashSharp } from 'react-icons/io5';
import { TfiMenuAlt } from 'react-icons/tfi';

import { OrdersPriceAmount } from '@/components/OrdersPage/OrdersPriceAmount';
import { useOrderdDeleteAction } from '@/hooks/client-actions';
import { toggleCollapse } from '@/redux/slices/ordersSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { TOrdersAttributes } from '@/types/ordersType';
import { Alert } from '@/ui/Alert';
import { dateFormat } from '@/utils/dateFormat';

type TOrdersListItemProps = {
  order: TOrdersAttributes;
}

export const OrdersListItem:FC<TOrdersListItemProps> = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { active, orderId } = useAppSelector(
    (state) => state.orderCollapseProductList
  );

  const { mutate: removeOrderById, isSuccess } = useOrderdDeleteAction();

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  const ProductsCount = () => (
    <div className='flex flex-col pl-5'>
      <p className='text-lg'>{order.attributes.products.data.length}</p>
      <p className='text-xs text-[#9fb0b7]'>Products</p>
    </div>
  );

  return (
    <tr
      className={
        'bg-white relative [&>td]:!p-2  [&>td]:border-t [&>td]:border-b [&>td]:border-gray-300'
      }
    >
      <td className='rounded-l border-l-2'>
        {!active && (
          <h3 className='underline tracking-widest line-clamp-2 text-ellipsis '>
            {order.attributes.title}
          </h3>
        )}
      </td>
      <td>
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
          <ProductsCount />
        </div>
      </td>

      <td>
        <div className='flex flex-col'>
          <p className='text-lg'>
            {dateFormat(order.attributes.createdAt, 'DD/MM/YYYY')}
          </p>
          <p className='text-lg'>
            {dateFormat(order.attributes.createdAt, 'HH:mm:ss')}
          </p>
        </div>
      </td>
      {!active && (
        <>
          <td>
            <OrdersPriceAmount products={order.attributes.products.data} />
          </td>
          <td className='rounded-r  border-r-2'>
            <IoTrashSharp
              className='w-4 h-4 cursor-pointer text-gray-500'
              onClick={() => setIsOpen(true)}
            />
            <Alert
              isOpen={isOpen}
              close={() => setIsOpen(false)}
              title={'You definitely want to remove this order?'}
              handler={() => removeOrderById({ id: order.id })}
            >
              <div className='flex items-center justify-start gap-2'>
                <p>{order.attributes.title}</p>
                <ProductsCount />
              </div>
            </Alert>
          </td>
        </>
      )}

      {active && (
        <td className='rounded-r relative bg-white  border-r-2'>
          &nbsp;
          {orderId === order.id && (
            <div className='absolute top-0 bottom-0 -right-0.5 w-10 flex items-center justify-center p-1 bg-gray-300 rounded-r'>
              <IoIosArrowForward className='text-white w-10 h-10' />
            </div>
          )}
        </td>
      )}
    </tr>
  );
};
