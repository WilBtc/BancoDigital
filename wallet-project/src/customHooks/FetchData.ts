// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import { useState, useEffect } from 'react';

// Internal imports
import { serverCalls } from '../api';

export interface ShopProps {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  prod_id: string;
  quantity: number;
  order_id?: string;
}

interface GetShopDataProps {
  shopData: ShopProps[];
  getData: () => void;
}

// Custom hook for fetching shop data
export const useGetShop = (): GetShopDataProps => {
  const [shopData, setShopData] = useState<ShopProps[]>([]);

  const handleDataFetch = async () => {
    const result = await serverCalls.getShop(); // Making the API call from the serverCalls object
    setShopData(result);
  };

  useEffect(() => {
    handleDataFetch();
  }, []); // The empty dependency array [] ensures that this effect runs only once

  return { shopData, getData: handleDataFetch };
};

interface GetOrderDataProps {
  orderData: ShopProps[];
  getData: () => void;
}

// Custom hook for fetching order data
export const useGetOrder = (): GetOrderDataProps => {
  const [orderData, setShopData] = useState<ShopProps[]>([]);

  const handleDataFetch = async () => {
    const result = await serverCalls.getOrder(); // Making the API call from the serverCalls object
    setShopData(result);
  };

  useEffect(() => {
    handleDataFetch();
  }, []); // The empty dependency array [] ensures that this effect runs only once

  return { orderData, getData: handleDataFetch };
};
