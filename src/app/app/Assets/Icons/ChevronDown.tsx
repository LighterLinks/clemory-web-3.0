import { IoChevronDownCircle } from "react-icons/io5";

export default function ChevronDown({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <IoChevronDownCircle size={size} color={color} />;
}