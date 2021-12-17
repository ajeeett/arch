import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import HomeScreenChild from './HomeScreenChild';
import { fetchShopifyConfigClear, fetchShopifyConfigRequest } from '../../../actions/shopifyActions';
import { showSnackBar } from '../../../utils/Helper/helper';
import { decryptUrl } from '../../../utils/encryption';
import { SHOPIFY_BASE_URL, SHOPIFY_GRAPHQL_URL } from '../../../api/APIConstants';
import Loader from '../../../globalComponents/Loader';

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [shopifyKey, setShopifyKey] = useState('');
  const [shopifyCollectionId, setShopifyCollectionId] = useState('');

  const dispatch = useDispatch();
  const shopifyResponse = useSelector(state => get(state, 'shopifyConfigReducer', ''));

  useEffect(() => {
    // call shopify reducer
    const getShopifyConfiguration = async () => {
      console.log('dispatching action for shopify from home ------------!!!');
      await dispatch(fetchShopifyConfigRequest());
    }

    // if (isEmpty(shopifyResponse?.data)) {
      setLoading(true);
      getShopifyConfiguration();
    // }

    // set loader false after 10 secs
    const timer = () => setTimeout(() => { setLoading(false) }, 10000);
    const setTimer = timer();

    return () => clearTimeout(setTimer);
  }, []);

  useEffect(() => {
    try {
      console.log('shopify fetch success => ', shopifyResponse?.shopifyConfigFetchSuccess);

      if (shopifyResponse?.shopifyConfigFetchSuccess && !isEmpty(shopifyResponse?.data) && shopifyKey.length == 0) {
        const { apiPassword, collectionId } = shopifyResponse?.data;
        console.log('Shopify data in home', shopifyResponse?.data);
        decryptShopifyData(apiPassword, collectionId);
      } else if (shopifyResponse?.error) {
        showSnackBar(shopifyResponse?.error);
        dispatch(fetchShopifyConfigClear());
        console.log('Shopify error in home => ', shopifyResponse?.error);
      } else {
        console.log("No data in shopify reducers: HOME");
      }
    } catch (e) {
      dispatch(fetchShopifyConfigClear());
      console.log('Shopify error in catch block! ==== HOME:ERROR!');
      console.log('Error message', e.message);
    }
  }, [shopifyResponse]);

  const decryptShopifyData = async (apiPassword, collectionId) => {
    try {
      const apiKey = await decryptUrl(apiPassword);
      const decryptedCollectionId = await decryptUrl(collectionId);
      console.log('Decrypted shopify API key', apiKey);
      console.log('Decrypted shopify collection Id', decryptedCollectionId);
      setShopifyKey(apiKey);
      setShopifyCollectionId(decryptedCollectionId);
      setLoading(false);
    } catch (e) {
      console.log('Error occured', e);
      setLoading(false);
    }
  };

  const httpLink = createHttpLink({
    uri: `${SHOPIFY_BASE_URL}${SHOPIFY_GRAPHQL_URL}`,
    headers: {
      "X-Shopify-Access-Token": shopifyKey
    }
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });

  return (
    isEmpty(shopifyKey) ? <Loader loading={loading} /> :
      <ApolloProvider client={client}>
        <HomeScreenChild navigation={navigation} shopifyCollectionId={shopifyCollectionId} />
      </ApolloProvider>
  );
}
