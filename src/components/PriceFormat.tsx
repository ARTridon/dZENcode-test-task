import { type FC } from 'react';

type TPriceFormatProps = {
  price: {
    UAH?: number | null;
    USD?: number | null;
  };
};

export const PriceFormat: FC<TPriceFormatProps> = ({ price }) => {
  const { UAH, USD } = price;
  return (
    <div>
      {UAH && <p>UAH {UAH}</p>}
      {USD && <p>USD {USD}</p>}
    </div>
  );
};
