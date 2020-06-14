import gql from 'graphql-tag'

export const CREATE_BODY_WEIGHT = gql`
  mutation createBodyWeight($input: BodyWeightInput!) {
    createBodyWeight(input: $input) {
      date
    }
  }
`
export const UPDATE_BODY_WEIGHT = gql`
  mutation updateBodyWeight($input: BodyWeightInput!) {
    updateBodyWeight(input: $input) {
      date
    }
  }
`
export const DELETE_BODY_WEIGHT = gql`
  mutation deleteBodyWeight($id: String!) {
    deleteBodyWeight(id: $id)
  }
`
export const GET_BODY_WEIGHT = gql`
  query getBodyWeight($id: String) {
    getBodyWeight(id: $id) {
      id
      createdTs
      createdBy
      modTs
      modBy
      date
      weight
      fatPercentage
    }
  }
`
