'use client';

import { useEffect, useState } from 'react';

import {
  useProductsGetAction,
  useProductsGetWithFilterAction,
  useTypesGetAction,
} from '@/hooks/client-actions';
import { DropDown } from '@/ui/DropDown';

export const ProductsFilter = () => {
  const { data, isFetched } = useTypesGetAction();
  const [selected, setSelecte] = useState('All');
  const { refetch } = useProductsGetWithFilterAction({ eq: selected });
  const { refetch: refetchProducts } = useProductsGetAction();

  useEffect(() => {
    if (selected !== 'All') {
      refetch();
    }
  }, [selected]);

  return (
    <div className='flex gap-5'>
      <div className='flex items-center'>
        <p className='text-[#859ca7] text-sm mr-3'>Type:</p>
        <DropDown
          afretChange={(value) => {
            if (value === 'All') {
              refetchProducts();
            }
          }}
          list={
            isFetched
              ? (data?.types?.data.map((i) => i.attributes.name) as string[])
              : []
          }
          selected={selected}
          setSelecte={setSelecte}
        />
      </div>
    </div>
  );
};
