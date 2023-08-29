import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TProductsData } from '@/types/productsType';

type TOrderCollapseProductListState = {
  active: boolean;
  products: TProductsData[];
  orderTitle: string;
  orderId: string;
};

const initialState: TOrderCollapseProductListState = {
  active: false,
  products: [],
  orderTitle: '',
  orderId: '',
};

const orderCollapseProductList = createSlice({
  name: 'order-collapse-product-list',
  initialState,
  reducers: {
    toggleCollapse: (
      state,
      action: PayloadAction<TOrderCollapseProductListState>
    ) => {
      state.active = action.payload.active;
      state.products = action.payload.products;
      state.orderTitle = action.payload.orderTitle;
      state.orderId = action.payload.orderId;
    },
  },
});

export const { toggleCollapse } = orderCollapseProductList.actions;

export default orderCollapseProductList.reducer;
