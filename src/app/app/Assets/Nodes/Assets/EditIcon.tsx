import { HiPencilAlt } from "react-icons/hi";
import { PiNotePencilLight } from "react-icons/pi";

export default function EditIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <PiNotePencilLight size={size} color={color} />;
}