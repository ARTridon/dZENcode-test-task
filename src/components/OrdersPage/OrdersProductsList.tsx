'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Transition } from '@headlessui/react';
import { IoTrashSharp } from 'react-icons/io5';

import { useProductDeleteAction } from '@/hooks/client-actions';
import { toggleCollapse } from '@/redux/slices/ordersSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Alert } from '@/ui/Alert';
import { cn } from '@/utils/cn';

export const OrdersProductsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { products, active, orderTitle, orderId } = useAppSelector(
    (state) => state.orderCollapseProductList
  );

  const { mutate: removeProductsById, isSuccess } = useProductDeleteAction();

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <Transition
      appear={true}
      as='div'
      show={active}
      enter='transition-opacity duration-75'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-150'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      className={cn(
        'flex items-center justify-between flex-col gap-0 ',
        active ? 'col-span-2' : 'hidden'
      )}
    >
      <h3 className='text-left w-full text-2xl/tight font-bold text-gray-600 px-6 my-5'>
        {orderTitle}
      </h3>

      {products.length ? (
        products.map((i, index) => (
          <div
            className={cn(
              'flex items-center justify-between gap-2 w-full  border-b border-gray-300 p-3 px-6',
              !index && 'border-t'
            )}
            key={i.id}
          >
            <div className='grid grid-cols-6 gap-10 w-full items-center'>
              <div>
                <Image
                  className='max-w-[80px] max-h-[80px] object-cover object-center'
                  src={i.attributes.photo.data?.attributes?.url}
                  height={80}
                  width={80}
                  alt='product photo'
                />
              </div>

              <div className='col-span-3'>
                <p className='underline '>{i.attributes.title}</p>
                <p>{i.attributes.serialNumber}</p>
              </div>

              <p>{i.attributes.type.data.attributes.name}</p>
              <p>{i.attributes.specification.data.attributes.name}</p>
            </div>

            <IoTrashSharp
              className='w-4 h-4 cursor-pointer text-gray-500'
              onClick={() => setIsOpen(true)}
            />
            <Alert
              isOpen={isOpen}
              close={() => setIsOpen(false)}
              title={'You definitely want to remove this product?'}
              handler={() => {
                removeProductsById({ id: i.id });
                dispatch(
                  toggleCollapse({
                    active: true,
                    products: products.filter((item) => item.id !== i.id),
                    orderTitle,
                    orderId,
                  })
                );
              }}
            >
              <div className='flex items-center justify-start gap-2'>
                <div
                  className={cn(
                    'w-4 h-4 rounded-full',
                    i.attributes.availability ? 'bg-red-600' : 'bg-green-600'
                  )}
                />
                {i.attributes.photo.data.attributes.url && (
                  <Image
                    src={i.attributes.photo.data.attributes.url}
                    height={80}
                    width={80}
                    alt=''
                  />
                )}
                <div className='flex flex-col items-start'>
                  <p className=''>{i.attributes.title}</p>
                  <p className='text-[#93a6b0] text-sm items-start'>
                    {i.attributes.serialNumber}
                  </p>
                </div>
              </div>
            </Alert>
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500 py-4'>No products</p>
      )}
    </Transition>
  );
};
