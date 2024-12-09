const collection = 'science';

export const MAIN_BANNER_COLLECTION_QUERY = `#graphql
  query {
    collection(handle: "${collection}") {
      handle
      image {
        url
      }
    }
}`;
