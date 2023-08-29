import { auth } from './drivers/auth.driver';
import { orders } from './drivers/orders.driver';
import { products } from './drivers/products.driver';
import { types } from './drivers/types.driver';

export const Api = { orders, products, auth,types };
