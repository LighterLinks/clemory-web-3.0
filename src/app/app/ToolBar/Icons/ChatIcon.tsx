import { CiChat1 } from "react-icons/ci";

export default function ChatIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <CiChat1 size={size} color={color} />;
}
