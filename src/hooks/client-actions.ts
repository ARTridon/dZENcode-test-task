import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { Api } from '@/graphQl';
import { TUsersPermissions } from '@/types/authType';
import { TOrders } from '@/types/ordersType';
import { TProductsRes } from '@/types/productsType';

export const useProductsGetAction = () => {
  const { data: session } = useSession();
  const queryCache = useQueryClient();

  const query = useQuery<Promise<unknown>, Error, TProductsRes>(
    ['products', session?.jwt],
    () => Api.products.get({ jwt: session?.jwt as string }),
    {
      initialData: queryCache.getQueryData(['products', session?.jwt]),
      enabled: !!session?.jwt,
    }
  );

  return { ...query };
};
export const useProductsGetWithFilterAction = ({ eq }: { eq: string }) => {
  const { data: session } = useSession();
  const queryCache = useQueryClient();

  const query = useQuery<Promise<unknown>, Error, TProductsRes>(
    ['products', session?.jwt],
    () =>
      Api.products.getWithFilter({
        jwt: session?.jwt as string,
        eq,
      }),
    {
      initialData: queryCache.getQueryData(['products', session?.jwt]),
      enabled: !!session?.jwt && eq !== 'All',
      staleTime: 0,
    }
  );

  return { ...query };
};
export const useProductDeleteAction = () => {
  const { data: session } = useSession();
  const queryCache = useQueryClient();

  const mutation = useMutation(
    ({ id }: { id: string }) =>
      Api.products.delete({ id, jwt: session?.jwt as string }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries({ queryKey: ['products', session?.jwt] });
        queryCache.invalidateQueries({ queryKey: ['orders', session?.jwt] });
      },
      onError: (error) => console.log(error),
    }
  );
  return { ...mutation };
};
export const useOrderdDeleteAction = () => {
  const { data: session } = useSession();
  const queryCache = useQueryClient();

  const mutation = useMutation(
    ({ id }: { id: string }) =>
      Api.orders.deleteOrder({ id, jwt: session?.jwt as string }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries({ queryKey: ['orders'] });
      },
      onError: (error) => console.log(error),
    }
  );
  return { ...mutation };
};

export const useOrdersGetAction = () => {
  const { data: session } = useSession();
  const queryCache = useQueryClient();

  const query = useQuery<Promise<unknown>, Error, TOrders>(
    ['orders', session?.jwt],
    async () =>
      Api.orders.getOrders({
        jwt: session?.jwt as string,
      }),
    {
      initialData: () => {
        return queryCache.getQueryData(['orders', session?.jwt]);
      },
      enabled: !!session?.jwt,
    }
  );

  return { ...query };
};

type TTypes = {
  types: {
    data: {
      attributes: {
        name: string;
      };
    }[];
  };
};
export const useTypesGetAction = () => {
  const { data: session } = useSession();
  const queryCache = useQueryClient();

  const query = useQuery<Promise<unknown>, Error, TTypes>(
    ['types', session?.jwt],
    async () =>
      Api.types.get({
        jwt: session?.jwt as string,
      }),
    {
      initialData: () => {
        return queryCache.getQueryData(['types', session?.jwt]);
      },
      enabled: !!session?.jwt,
    }
  );

  return { ...query };
};

export const useAvataGetAction = ({ id }: { id: string }) => {
  const { data: session } = useSession();

  const query = useQuery<Promise<unknown>, Error, TUsersPermissions>(
    ['avatar', session?.jwt],
    async () =>
      Api.auth.getAvatar({
        jwt: session?.jwt as string,
        id,
      }),
    {
      enabled: !!session?.jwt,
    }
  );

  return { ...query };
};
