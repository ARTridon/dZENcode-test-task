import { dehydrate } from '@tanstack/query-core';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/config/authConfig';
import { Api } from '@/graphQl';
import { queryClient } from '@/lib/queryClient';
import { TLoginResponse, typeAuthValidationSchema } from '@/types/authType';

export const dehydratedOrdersAction = async () => {
  const session = await getServerSession(authOptions);
  await queryClient.prefetchQuery({
    queryKey: ['orders', session?.jwt],
    queryFn: async () => Api.orders.getOrders({ jwt: session?.jwt as string }),
  });
  return dehydrate(queryClient);
};

export const dehydrateProductsAction = async () => {
  const session = await getServerSession(authOptions);

  await queryClient.prefetchQuery({
    queryKey: ['products', session?.jwt],
    queryFn: async () => Api.products.get({ jwt: session?.jwt as string }),
    staleTime: 0,
  });
  await queryClient.prefetchQuery({
    queryKey: ['types', session?.jwt],
    queryFn: async () => Api.types.get({ jwt: session?.jwt as string }),
    staleTime: 0,
  });
  return dehydrate(queryClient);
};

export const authAction = ({
  identifier,
  password,
}: typeAuthValidationSchema) => {
  return queryClient.fetchQuery(['login'], () =>
    Api.auth.login({ identifier, password })
  );
};
