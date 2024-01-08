import { FaCheck } from "react-icons/fa6";

export default function CheckIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <FaCheck size={size} color={color} />;
}
