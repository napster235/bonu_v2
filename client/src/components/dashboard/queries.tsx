import gql from 'graphql-tag';

export const GET_PAGINATED_BONS = gql`
query($first: Int, $orderBy: BonOrderBy, $filter: BonFilter) {
    bons(first: $first, orderBy: $orderBy, filter: $filter)
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
  mutation DeleteBon($id: ID!) {
    deleteBon(input: { id: $id }) {
      bon {
        id
        purchaseDate
        notes
        amount
      }
    }
  }
`;


export const CREATE_BON = gql`
  mutation CreateBon($purchaseDate: ISO8601Date!, $amount: Int!, $notes: String!, $userId: ID!) {
    createBon(input: { purchaseDate: $purchaseDate, amount: $amount, notes: $notes, userId: $userId } ) {
      bon {
        purchaseDate
        amount
        notes
        userId
      }
    }
  }
`;


export const UPDATE_BON = gql`
  mutation UpdateBon($purchaseDate: ISO8601Date!, $amount: Int, $notes: String, $id: ID!) {
    updateBon(input: { purchaseDate: $purchaseDate, amount: $amount, notes: $notes, id: $id } ) {
      bon {
        purchaseDate
        amount
        notes
        id
      }
    }
  }
`;