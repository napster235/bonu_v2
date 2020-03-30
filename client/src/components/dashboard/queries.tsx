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
  mutation($purchaseDate: String!, $amount: Int!, $notes: String!, $userId: ID!,) {
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