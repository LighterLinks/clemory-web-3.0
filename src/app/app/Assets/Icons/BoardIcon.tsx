import { CiViewBoard } from "react-icons/ci";

export default function BoardIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <CiViewBoard size={size} color={color} />;
}