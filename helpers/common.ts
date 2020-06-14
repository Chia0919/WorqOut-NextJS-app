export interface IAction<TType = string, TPayload = any> {
  type: TType
  payload: TPayload
}
interface IexercisesList {
  type: string
  name: string
  checked: boolean
}

export function convertToMonth(UNIX_timestamp: any) {
  const a = new Date(UNIX_timestamp)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const year = a.getFullYear()
  const month = months[a.getMonth()]
  const date = a.getDate()
  const time = `${month || '-'}, ${date || '-'}, ${year || '-'}`
  return time
}
