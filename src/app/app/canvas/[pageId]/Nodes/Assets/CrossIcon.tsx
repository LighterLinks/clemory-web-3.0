import { RxCross1 } from "react-icons/rx";

export default function CrossIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <RxCross1 size={size} color={color} />;
}
