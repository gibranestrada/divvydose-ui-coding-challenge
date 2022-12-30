import { format } from "date-fns";

type DateType = string | number | Date;

export const formatDate = (date: DateType) =>
  format(new Date(date), "MM/dd/yyyy, pp");
