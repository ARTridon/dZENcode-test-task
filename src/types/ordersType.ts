import { TProducts } from '@/types/productsType';

export type TOrders = {
  orders: TOrdersData;
};

export type TOrdersData = {
  data: TOrdersAttributes[];
};

export type TOrdersAttributes = {
  id: string;
  attributes: TOrdersAttributesItems;
};

export type TOrdersAttributesItems = {
  title: string;
  description?: string;
  createdAt: string;
  products: TProducts;
};
