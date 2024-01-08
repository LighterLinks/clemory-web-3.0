import { GoCheckCircle } from "react-icons/go";

export default function CheckCircleIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <GoCheckCircle size={size} color={color} />;
}
