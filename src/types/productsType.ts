export type TProductsRes = {
  products: TProducts;
};

export type TProducts = {
  data: TProductsData[];
};

export type TProductsData = {
  id: string;
  attributes: TProductsAttributes;
};

export type TProductsAttributes = {
  availability: boolean;
  createdAt: string;
  title: string;
  serialNumber: string;
  isNew: string;
  product: Product;
  type: TSpecificationOrType;
  specification: TSpecificationOrType;
  guarantee: Guarantee;
  price: { [key: string]: number };
  photo: Photo;
};

export type Guarantee = {
  start: string;
  end: string;
};

export type Photo = {
  data: {
    attributes: {
      url: string;
    };
  };
};

export type Product = {
  data: {
    attributes: {
      title: string;
    };
  };
};

export type TSpecificationOrType = {
  data: {
    attributes: {
      name: string;
    };
  };
};
