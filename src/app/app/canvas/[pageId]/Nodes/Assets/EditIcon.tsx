import { HiPencilAlt } from "react-icons/hi";

export default function EditIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <HiPencilAlt size={size} color={color} />;
}
