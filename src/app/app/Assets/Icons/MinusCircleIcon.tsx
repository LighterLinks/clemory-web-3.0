import { FaCircleMinus } from "react-icons/fa6";

export default function MinusCircleIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <FaCircleMinus size={size} color={color} />;
}
