import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TProductsData } from '@/types/productsType';


type TOrderCollapseProductListState = {
  active: boolean;
  products: TProductsData[];
  orderTitle: string;
}



const initialState: TOrderCollapseProductListState = {
  active: false,
  products: [],
  orderTitle: '',
};

const orderCollapseProductList = createSlice({
  name: 'order-collapse-product-list',
  initialState,
  reducers: {
    toggleCollapse: (state, action: PayloadAction<TOrderCollapseProductListState>) => {
      state.active = action.payload.active;
      state.products = action.payload.products;
      state.orderTitle = action.payload.orderTitle;
    },
  },
});

export const { toggleCollapse } = orderCollapseProductList.actions;

export default orderCollapseProductList.reducer;
