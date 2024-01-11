import { HiOutlineDocument } from "react-icons/hi";
import { IoDocumentOutline } from "react-icons/io5";

export default function EmptyDocIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <IoDocumentOutline size={size} color={color} />;
}
