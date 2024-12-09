const collection = 'supplements';

export const TRENDING_QUERY = `#graphql
  query {
    collection(handle: "${collection}") {
      products(first: 4) {
        edges {
          cursor
          node {
            id
            title
            description
            tags
            sellingPlanGroups(first: 1) {
              nodes {
                sellingPlans(first: 1) {
                  edges {
                    node {
                      id
                      name
                      priceAdjustments {
                        adjustmentValue {
                          ...on SellingPlanPercentagePriceAdjustment {
                            adjustmentPercentage
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            featuredImage {
              url
            }
            variants(first: 1) {
              nodes {
                id
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                sku
                availableForSale
              }
            }
          }
        }
      }
    }
}`;
