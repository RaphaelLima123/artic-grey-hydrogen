const query =
  '(title:Sleep) OR (title:Cognitive Function) OR (titla:Foundational Health) OR (title:Athletic Performance) OR (title:Hormone Support)';

export const GOALS_COLLECTIONS_QUERY = `#graphql
  query {
    collections(first: 5, query: "${query}") {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
          }
          onlineStoreUrl
        }
      }
    }
}`;
