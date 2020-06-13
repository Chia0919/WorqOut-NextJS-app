import gql from 'graphql-tag'

export const GET_WORKOUT_PLAN = gql`
  query getWorkPlan($id: String) {
    getWorkPlan(id: $id) {
      id
      workoutName
      workoutNote
      days
      exercise {
        name
        set {
          set
          kg
          rep
        }
      }
    }
  }
`
export const ADD_WORKOUT_PLAN = gql`
  mutation addWorkoutPlan(
    $workoutInput: WorkoutPlanInput!
    $exerciseInput: [ExerciseInput!]!
  ) {
    addWorkoutPlan(workoutInput: $workoutInput, exerciseInput: $exerciseInput)
  }
`
export const DELETE_WORKOUT_PLAN = gql`
  mutation deleteWorkoutPlan($id: String!) {
    deleteWorkoutPlan(id: $id)
  }
`
