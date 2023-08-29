'use client';

import { useProductsGetAction } from '@/hooks/client-actions';

export const ProductsCount = () => {
  const { data, isFetched } = useProductsGetAction();
  return (
    <>
      <h1 className='text-gray-800 text-3xl/tight font-bold my-10 mr-3'>
        Products / {isFetched ? data?.products.data.length : 0}
      </h1>
    </>
  );
};
