import { INode } from "@/lib/interface";

export default function WebFrame({ nodeInfo }: { nodeInfo: INode }) {
  return (
    <div className="w-full h-full p-5">
      <iframe src={nodeInfo.url} className="w-full h-full"></iframe>
    </div>
  );
}
