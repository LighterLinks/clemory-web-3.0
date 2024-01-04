import { PiNotepad } from "react-icons/pi";

export default function NotePadIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <PiNotepad size={size} color={color} />;
}