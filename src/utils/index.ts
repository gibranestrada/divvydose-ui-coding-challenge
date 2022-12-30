import { format } from "date-fns";

type DateTypes = string | number | Date;

export const formatDate = (date: DateTypes) =>
  format(new Date(date), "MM/dd/yyyy, pp");

export const toFirstLetterUpperCase = (str: string) => {
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  return str2;
};
