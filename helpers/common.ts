export interface IAction<TType = string, TPayload = any> {
  type: TType
  payload: TPayload
}
interface IexercisesList {
  type: string
  name: string
  checked: boolean
}
