import {Text} from '@ui-kitten/components';
import React from 'react';
import {getProductsByPage} from '../../../actions/auth/products/get-products-by-page';
import {useQuery} from '@tanstack/react-query';
import {Product} from '../../../domain/entities/product';
import {MainLayout} from '../../layouts/MainLayout';

export const HomeScreen = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data: products = []} = useQuery<Promise<Product[]>>({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getProductsByPage(0),
  });

  return (
    <MainLayout
      title="TesloShop - Products"
      subtitle="Administrative Application">
      <Text>Hello World</Text>
    </MainLayout>
  );
};
