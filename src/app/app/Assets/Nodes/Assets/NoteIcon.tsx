import { TbNotes } from "react-icons/tb";

export default function NoteIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <TbNotes size={size} color={color} />;
}
