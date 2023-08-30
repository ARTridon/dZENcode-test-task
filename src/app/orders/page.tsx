import { Hydrate } from '@/components/HydrateClient';
import { Layout } from '@/components/Layout';
import { OrdersPage as OrdersPageWrapper } from '@/components/OrdersPage/OrdersPage';
import { dehydratedOrdersAction } from '@/hooks/server-actions';

export const revalidate = 3600;

export default async function OrdersPage() {
  return (
    <Hydrate state={await dehydratedOrdersAction()}>
      <Layout>
        <OrdersPageWrapper />
      </Layout>
    </Hydrate>
  );
}
