import { GoSidebarCollapse } from "react-icons/go";

export default function CollapseIcon({ size, color }: { size: number; color: string }) {
    return (
        <GoSidebarCollapse size={size} color={color} />
    );
}