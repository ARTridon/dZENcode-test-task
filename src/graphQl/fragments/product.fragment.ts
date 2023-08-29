import gql from 'graphql-tag';

export const productAttributesFragment = gql`
  fragment productAttributes on Product {
    createdAt
    title
    serialNumber
    isNew
    availability
    product {
      data {
        attributes {
          title
        }
      }
    }
    type {
      data {
        attributes {
          name
        }
      }
    }
    specification {
      data {
        attributes {
          name
        }
      }
    }
    guarantee {
      start
      end
    }
    price {
      UAH
      USD
    }
    photo {
      data {
        attributes {
          url
        }
      }
    }
  }
`;
