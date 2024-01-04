import { BiHomeAlt } from "react-icons/bi";

export default function HomeIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <BiHomeAlt size={size} color={color} />;
}
