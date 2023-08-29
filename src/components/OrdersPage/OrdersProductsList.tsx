'use client';

import Image from 'next/image';

import { Transition } from '@headlessui/react';
import { IoTrashSharp } from 'react-icons/io5';

import { useProductDeleteAction } from '@/hooks/client-actions';
import { useAppSelector } from '@/redux/store';
import { cn } from '@/utils/cn';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const OrdersProductsList = () => {
  const { products, active, orderTitle } = useAppSelector(
    (state) => state.orderCollapseProductList
  );

  const { mutate: removeProductsById } = useProductDeleteAction();

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

      {products.length?products.map((i, index) => (
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
                src={
                  NEXT_PUBLIC_API_URL +
                  i.attributes.photo.data?.attributes?.url
                }
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
            onClick={() => removeProductsById({ id: i.id })}
          />
        </div>
      )):<p className='text-center text-gray-500 py-4'>No products</p>}
    </Transition>
  );
};
