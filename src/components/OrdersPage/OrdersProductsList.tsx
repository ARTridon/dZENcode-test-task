'use client';

import { Transition } from '@headlessui/react';

import { ProductsTable } from '@/components/ProductsPage/ProductsTable';
import { useAppSelector } from '@/redux/store';
import { cn } from '@/utils/cn';

export const OrdersProductsList = () => {
  const { products, active, orderTitle } = useAppSelector(
    (state) => state.orderCollapseProductList
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

      {products.length ? (
        <ProductsTable products={products} shortView={true} />
      ) : (
        <p className='text-center text-gray-500 py-4'>No products</p>
      )}
    </Transition>
  );
};
