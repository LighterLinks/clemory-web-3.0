export const getTitleAndText = (json: any) => {
  const content = searchContentBlocks(json);
  const title = content.split("\n")[0];
  const text = content.split("\n").slice(1).join("\n");
  if (title === undefined) return { title: "", text: "" };
  if (text === undefined) return { title: title, text: "" };
  return { title: title, text: text };
};

function searchContentBlocks(blocks: any[]): string {
  if (blocks === undefined) return "";
  let contentTexts: string[] = [];
  for (let block of blocks) {
    if (
      !(
        block.type === "heading" ||
        block.type === "paragraph" ||
        block.type === "codeBlock" ||
        block.type === "bulletListItem" ||
        block.type === "numberedListItem"
      )
    )
      continue;
    let contentText = "";
    let contents = block.content;
    if (contents === null) continue;
    for (let content of contents) {
      if (content.type === "text") {
        contentText += content.text;
      }
    }
    if (contentText.length > 0) {
      contentTexts.push(contentText);
    }
    let children = block.children;
    if (children === null) continue;
    let childrenText = searchContentBlocks(children);
    if (childrenText.length > 0) {
      contentTexts.push(childrenText);
    }
  }
  return contentTexts.join("\n");
}
