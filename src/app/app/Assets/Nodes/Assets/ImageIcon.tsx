import { IoImageOutline } from "react-icons/io5";

export default function ImageIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <IoImageOutline size={size} color={color} />;
}