'use client';

import { type FC, useEffect, useState } from 'react';

import Image from 'next/image';

import { IoTrashSharp } from 'react-icons/io5';

import { GuaranteeFromTo } from '@/components/GuaranteeFromTo';
import { PriceFormat } from '@/components/PriceFormat';
import { ProductsAvailability } from '@/components/ProductsPage/ProductsAvailability';
import { useProductDeleteAction } from '@/hooks/client-actions';
import { toggleCollapse } from '@/redux/slices/ordersSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { TProductsData } from '@/types/productsType';
import { Alert } from '@/ui/Alert';
import { cn } from '@/utils/cn';

type TProductsRowProps = {
  product: TProductsData;
  shortView?: boolean;
};

export const ProductsRow: FC<TProductsRowProps> = ({ product, shortView }) => {
  const dispatch = useAppDispatch();
  const { products, orderTitle, orderId } = useAppSelector(
    (state) => state.orderCollapseProductList
  );
  const { mutate: removeProductsById, isSuccess } = useProductDeleteAction();
  const [isOpen, setIsOpen] = useState(false);
  const imgSrc = product.attributes.photo.data.attributes.url;

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  const Images = () => (
    <>
      {imgSrc && (
        <Image
          className='max-w-[80px] max-h-[80px] object-contain object-center'
          src={imgSrc}
          height={80}
          width={80}
          alt=''
        />
      )}
    </>
  );

  const TitleAndSerialNumber = () => (
    <div className='flex flex-col items-start'>
      <p>{product.attributes.title}</p>
      <p className='text-lime-900 text-sm items-start'>
        {product.attributes.serialNumber}
      </p>
    </div>
  );

  return (
    <tr className='bg-white rounded [&>td]:p-4  [&>td]:border-t [&>td]:border-b [&>td]:border-gray-300'>
      <td className={cn('rounded', !shortView && 'border-l-2')}>
        <ProductsAvailability availability={product.attributes.availability} />
      </td>
      <td>
        <Images />
      </td>
      <td>
        <TitleAndSerialNumber />
      </td>
      {!shortView && (
        <>
          <td>{product.attributes.type.data.attributes.name}</td>
          <td>
            <div className='flex flex-col items-center'>
              <GuaranteeFromTo
                start={product.attributes.guarantee.start}
                end={product.attributes.guarantee.end}
              />
            </div>
          </td>
        </>
      )}
      <td>
        <p className='text-sm text-lime-900'>
          {product.attributes.isNew ? 'NEW' : 'USER'}
        </p>
      </td>
      {!shortView && (
        <td className='text-lime-900'>
          <PriceFormat price={product.attributes.price} />
        </td>
      )}

      {!shortView && (
        <td>
          <p className='text-sm text-lime-900 line-clamp-2 text-ellipsis'>
            {product.attributes.product.data
              ? product.attributes.product.data.attributes.title
              : 'no order yet'}
          </p>
        </td>
      )}
      <td className={cn('rounded', !shortView && 'border-r-2')}>
        <IoTrashSharp
          className='w-4 h-4 cursor-pointer text-gray-500'
          onClick={() => setIsOpen(true)}
        />
        <Alert
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          title={'You definitely want to remove this product?'}
          handler={() => {
            removeProductsById({ id: product.id });
            dispatch(
              toggleCollapse({
                active: true,
                products: products.filter((item) => item.id !== product.id),
                orderTitle,
                orderId,
              })
            );
          }}
        >
          <div className='flex items-center justify-start gap-2'>
            <ProductsAvailability
              availability={product.attributes.availability}
            />

            <Images />
            <TitleAndSerialNumber />
          </div>
        </Alert>
      </td>
    </tr>
  );
};
