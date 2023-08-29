import { dehydrate } from '@tanstack/query-core';
import { getServerSession } from 'next-auth';

import { Hydrate } from '@/components/HydrateClient';
import { Layout } from '@/components/Layout';
import { ProductsCount } from '@/components/ProductsPage/ProductsCount';
import { ProductsFilter } from '@/components/ProductsPage/ProductsFilter';
import { ProductsTable } from '@/components/ProductsPage/ProductsTable';
import { authOptions } from '@/config/authConfig';
import { Api } from '@/graphQl';
import { queryClient } from '@/lib/queryClient';


export const revalidate = 60;

const dehydrateProducts = async () => {
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

const ProductsPage = async () => {
  return (
    <Hydrate state={await dehydrateProducts()}>
      <Layout>
        <section className='w-full flex items-start justify-center flex-col p-3'>
          <div className='flex gap-8 items-center w-full'>
            <ProductsCount />
            <ProductsFilter />
          </div>
          <div className='pt-10 w-full'>
            <ProductsTable />
          </div>
        </section>
      
      </Layout>
    </Hydrate>
  );
};

export default ProductsPage;
