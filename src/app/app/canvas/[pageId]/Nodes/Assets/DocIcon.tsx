import { TbNotes } from "react-icons/tb";

export default function DocIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <TbNotes size={size} color={color} />;
}
