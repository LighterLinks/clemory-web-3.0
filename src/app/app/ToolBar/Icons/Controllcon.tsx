import { AiOutlineControl } from "react-icons/ai";

export default function ControlIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <AiOutlineControl size={size} color={color} />;
}
