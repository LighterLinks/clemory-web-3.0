import { BsMic } from "react-icons/bs";

export default function AudioIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <BsMic size={size} color={color} />;
}
