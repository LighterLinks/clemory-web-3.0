import { CiSearch } from "react-icons/ci";

export default function SearchIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return <CiSearch size={size} color={color} />;
}
