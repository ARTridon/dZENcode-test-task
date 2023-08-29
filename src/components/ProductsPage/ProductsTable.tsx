'use client';

import React from 'react';

import { ProductsRow } from '@/components/ProductsPage/ProductsRow';
import { useProductsGetAction } from '@/hooks/client-actions';

export const ProductsTable = () => {
  const { data, isFetched } = useProductsGetAction();

  return (
    <div>
      <table className='border-spacing-y-2 border-separate table-auto w-full'>
        <tbody>
          {isFetched &&
            data?.products?.data.map((p, i) => (
              <ProductsRow key={p.id} product={p} index={i} />
            ))}
        </tbody>
      </table>
    </div>
  );
};
