import { parseISO, format } from "date-fns";

interface DateProps {
  dateString: string;
}

export default function Date({ dateString }: DateProps) {
  const date = parseISO(dateString);
  const formatDateString = format(date, "LLLL d, yyyy");
  return <time dateTime={dateString}>{formatDateString}</time>;
}
