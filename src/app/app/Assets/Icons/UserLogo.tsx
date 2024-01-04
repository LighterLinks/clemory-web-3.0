import { AiOutlineUser } from "react-icons/ai";

export default function UserLogo({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <AiOutlineUser size={size} color={color} />;
}
