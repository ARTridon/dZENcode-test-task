'use client';

import Image from 'next/image';

import { Transition } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { IoTrashSharp } from 'react-icons/io5';

import { Api } from '@/graphQl';
import { useAppSelector } from '@/redux/store';
import { cn } from '@/utils/cn';

export const OrdersProductsList = () => {
  const { products, active, orderTitle } = useAppSelector(
    (state) => state.orderCollapseProductList
  );

  const { data: session } = useSession();
  const queryCache = useQueryClient();

  const { mutate: removeProductsById } = useMutation(
    ({ id }: { id: string }) =>
      Api.products.delete({ id, jwt: session?.jwt as string }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries({ queryKey: ['orders', session?.jwt] });
      },
      onError: (error) => console.log(error),
    }
  );

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

      {products.map((i, index) => (
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
                  'http://127.0.0.1:1337' +
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
      ))}
    </Transition>
  );
};
