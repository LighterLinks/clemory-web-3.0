import { CiMap } from "react-icons/ci";


export default function MinimapIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <CiMap size={size} color={color} />;
}
