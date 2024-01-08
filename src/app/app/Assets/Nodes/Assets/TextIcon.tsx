import { PiTextT } from "react-icons/pi";

export default function TextIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <PiTextT size={size} color={color} />;
}