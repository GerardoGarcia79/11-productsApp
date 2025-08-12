import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {getProductsByPage} from '../../../actions/auth/products/get-products-by-page';
import {useQuery} from '@tanstack/react-query';
import {Product} from '../../../domain/entities/product';

export const HomeScreen = () => {
  const {data: products = []} = useQuery<Promise<Product[]>>({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getProductsByPage(0),
  });

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{JSON.stringify(products, null, 2)}</Text>

      {/* Logout button */}
      {/* <Button
        onPress={logout}
        accessoryLeft={<Icon name="log-out-outline" size={20} />}>
        Cerrar sesión
      </Button> */}
    </Layout>
  );
};
