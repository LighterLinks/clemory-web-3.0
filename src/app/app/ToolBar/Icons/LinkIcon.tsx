import { FaLink } from "react-icons/fa6";

export default function LinkIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <FaLink size={size} color={color} />;
}
