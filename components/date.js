import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  const formatDateString = format(date, "LLLL d, yyyy");
  return <time dateTime={dateString}>{formatDateString}</time>;
}
