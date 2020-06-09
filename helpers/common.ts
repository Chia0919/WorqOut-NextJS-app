export interface IAction<TType = string, TPayload = any> {
  type: TType;
  payload: TPayload;
}
interface IexercisesList {
  type: string;
  name: string;
  checked: boolean;
}

export const daysOfWeeks = [
  {
    value: "Monday",
    label: "Monday",
  },
  {
    value: "Tuesday",
    label: "Tuesday",
  },
  {
    value: "Wednesday",
    label: "Wednesday",
  },
  {
    value: "Thursday",
    label: "Thursday",
  },
  {
    value: "Friday",
    label: "Friday",
  },
  {
    value: "Saturday",
    label: "Saturday",
  },
  {
    value: "Sunday",
    label: "Sunday",
  },
];
