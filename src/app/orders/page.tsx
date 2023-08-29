import { dehydrate } from '@tanstack/query-core';
import { getServerSession } from 'next-auth';

import { Hydrate } from '@/components/HydrateClient';
import { Layout } from '@/components/Layout';
import { OrdersPage as OrdersPageWrapper } from '@/components/OrdersPage/OrdersPage';
import { authOptions } from '@/config/authConfig';
import { Api } from '@/graphQl';
import { queryClient } from '@/lib/queryClient';

export const revalidate = 3600;

const getOrders = async () => {
  const session = await getServerSession(authOptions);
  await queryClient.prefetchQuery({
    queryKey: ['orders', session?.jwt],
    queryFn: async () => Api.orders.getOrders({ jwt: session?.jwt as string }),
  });
  return dehydrate(queryClient);
};

export default async function OrdersPage() {
  const dehydratedState = await getOrders();

  return (
    <Hydrate state={dehydratedState}>
      <Layout>
        <OrdersPageWrapper />
      </Layout>
    </Hydrate>
  );
}
