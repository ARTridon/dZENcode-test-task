'use client';

import { type FC } from 'react';

import { ProductsRow } from '@/components/ProductsPage/ProductsRow';
import { useProductsGetAction } from '@/hooks/client-actions';
import { TProductsData } from '@/types/productsType';
import { cn } from '@/utils/cn';

type TProductsTableProps = {
  products?: TProductsData[] | undefined;
  shortView?: boolean;
};

export const ProductsTable: FC<TProductsTableProps> = ({
  products,
  shortView,
}) => {
  const { data, isFetched } = useProductsGetAction();

  const productsData =
    isFetched && !!products ? products! : data?.products?.data;

  return (
    <table
      className={cn(
        'table-auto w-full',
        !shortView && 'border-spacing-y-2 border-separate'
      )}
    >
      <tbody>
        {isFetched &&
          productsData?.map((p) => (
            <ProductsRow key={p.id} product={p} shortView={shortView} />
          ))}
      </tbody>
    </table>
  );
};
