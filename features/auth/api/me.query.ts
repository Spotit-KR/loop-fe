import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      loginId
      nickname
      createdAt
      updatedAt
    }
  }
`;

export interface MeQueryResult {
  me: {
    id: number;
    loginId: string;
    nickname: string;
    createdAt: string;
    updatedAt: string;
  };
}
