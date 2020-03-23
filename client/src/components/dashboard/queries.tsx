import gql from 'graphql-tag';

export const GET_PAGINATED_BONS = gql`
query($first: Int, $orderBy: BonOrderBy) {
    bons(first: $first, orderBy: $orderBy)
      @connection(key: "MessagesConnection") {
      id
      notes
      createdAt
      purchaseDate
      amount
    }
  }
`;

export const DELETE_BON = gql`
  mutation($id: ID!) {
    deleteBon(id: $id)
  }
`;


export const CREATE_BON = gql`
  mutation($text: String!) {
    createBon(text: $text) {
      id
      amount
      purchaseDate
      notes
    }
  }
`;