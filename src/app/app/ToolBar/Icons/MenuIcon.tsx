import { IoMenu } from "react-icons/io5";

export default function MenuIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <IoMenu size={size} color={color} />;
}
