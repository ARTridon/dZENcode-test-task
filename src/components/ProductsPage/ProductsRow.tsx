'use client';

import { useState ,useEffect} from 'react';

import Image from 'next/image';

import { IoTrashSharp } from 'react-icons/io5';

import { GuaranteeFromTo } from '@/components/ProductsPage/GuaranteeFromTo';
import { useProductDeleteAction } from '@/hooks/client-actions';
import { TProductsData } from '@/types/productsType';
import { Alert } from '@/ui/Alert';
import { cn } from '@/utils/cn';

type TProductsRowProps = {
  product: TProductsData;
  index: number;
};

export const ProductsRow = ({ product }: TProductsRowProps) => {
  const { mutate: removeProductsById ,isSuccess} = useProductDeleteAction();
  const [isOpen, setIsOpen] = useState(false);
  const imgSrc = product.attributes.photo.data.attributes.url;

  useEffect(()=>{
    if(isSuccess){
      setIsOpen(false)
    }
  },[isSuccess])


  return (
    <tr className='bg-white rounded-xl [&>td]:p-4'>
      <td className='rounded-l-lg'>
        <div
          className={cn(
            'w-4 h-4 rounded-full',
            product.attributes.availability ? 'bg-green-300' : ' bg-red-300'
          )}
        />
      </td>
      <td>{imgSrc && <Image className='max-w-[80px] max-h-[80px] object-cover object-center' src={imgSrc} height={80} width={80} alt='' />}</td>
      <td>
        <div className='flex flex-col items-start'>
          <p className=''>{product.attributes.title}</p>
          <p className='text-[#93a6b0] text-sm items-start'>
            {product.attributes.serialNumber}
          </p>
        </div>
      </td>
      <td>{product.attributes.type.data.attributes.name}</td>
      <td>
        <div className='flex flex-col items-center'>
          <GuaranteeFromTo
            start={product.attributes.guarantee.start}
            end={product.attributes.guarantee.end}
          />
        </div>
      </td>
      <td>
        <p className='text-sm text-[#2e3e45]'>
          {product.attributes.isNew ? 'NEW' : 'USER'}
        </p>
      </td>
      <td className='text-[#2e3e45]'>
        UAH {product.attributes.price.UAH}
        <br />
        USD {product.attributes.price.USD}
      </td>

      <td>
        <p className='text-sm text-[#2e3e45] line-clamp-2 text-ellipsis'>
          {product.attributes.product.data
            ? product.attributes.product.data.attributes.title
            : 'no order yet'}
        </p>
      </td>
      <td className='text-sm text-[#2e3e45]'></td>
      <td className='rounded-r-lg'>
        <IoTrashSharp
          className='w-4 h-4 cursor-pointer text-gray-500'
          onClick={() => setIsOpen(true)}
        />
        <Alert
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          title={'You definitely want to remove this product?'}
          handler={() => removeProductsById({ id: product.id })}
        >
          <div className='flex items-center justify-start gap-2'>
            <div
              className={cn(
                'w-4 h-4 rounded-full',
                product.attributes.availability ? 'bg-red-600' : 'bg-green-600'
              )}
            />
            {imgSrc && <Image src={imgSrc} height={80} width={80} alt='' />}
            <div className='flex flex-col items-start'>
              <p className=''>{product.attributes.title}</p>
              <p className='text-[#93a6b0] text-sm items-start'>
                {product.attributes.serialNumber}
              </p>
            </div>
          </div>
        </Alert>
      </td>
    </tr>
  );
};
