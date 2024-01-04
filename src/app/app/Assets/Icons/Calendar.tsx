import { BiCalendarAlt } from "react-icons/bi";

export default function CalendarIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <BiCalendarAlt size={size} color={color} />;
}