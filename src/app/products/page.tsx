import { Hydrate } from '@/components/HydrateClient';
import { Layout } from '@/components/Layout';
import { ProductsCount } from '@/components/ProductsPage/ProductsCount';
import { ProductsFilter } from '@/components/ProductsPage/ProductsFilter';
import { ProductsTable } from '@/components/ProductsPage/ProductsTable';
import { dehydrateProductsAction } from '@/hooks/server-actions';

export const revalidate = 3600;

const ProductsPage = async () => {
  return (
    <Hydrate state={await dehydrateProductsAction()}>
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
