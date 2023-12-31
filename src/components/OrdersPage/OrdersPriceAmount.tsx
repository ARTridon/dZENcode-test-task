import { type FC } from 'react';

import { TProductsData } from '@/types/productsType';

type TProductsTableProps = {
  products: TProductsData[];
};

export const OrdersPriceAmount: FC<TProductsTableProps> = ({ products }) => {
  const { UAH, USD } = products.reduce(
    (acc, item) => {
      const price = item.attributes.price;
      acc.UAH += price.UAH;
      acc.USD += price.USD;
      return acc;
    },
    { UAH: 0, USD: 0 }
  );
  return (
    <div>
      <p>UAH {UAH}</p>
      <p>USD {USD}</p>
    </div>
  );
};
