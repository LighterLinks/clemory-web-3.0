import { HiOutlineDocument } from "react-icons/hi";

export default function EmptyDocIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <HiOutlineDocument size={size} color={color} />;
}
