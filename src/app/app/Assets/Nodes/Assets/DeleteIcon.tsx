import { FaDeleteLeft } from "react-icons/fa6";

export default function DeleteIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <FaDeleteLeft size={size} color={color} />;
}