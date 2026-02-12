import { IdentityTransformer } from "./IdentityTransformer.ts";
import type { Node, TextNode } from "./types.ts";

export class TextCollapseTransformer extends IdentityTransformer {
  protected override async chooseChildren(nodes: Node[]): Promise<Node[]> {
    const children = await super.chooseChildren(nodes);
    const results: Node[] = [];
    let lastText: null | string = null;
    let lastTextId: string | undefined = undefined;
    for (const child of children) {
      if (child.type == "text") {
        if (lastText != null) {
          lastText = `${lastText}${child.text}`;
        } else {
          lastText = child.text;
          lastTextId = child.id;
        }
      } else {
        if (lastText != null) {
          const textNode: TextNode = { type: "text", text: lastText };
          if (lastTextId != null) {textNode.id = lastTextId;}
          results.push(textNode);
          lastText = null;
          lastTextId = undefined;
        }
        results.push(child);
      }
    }
    if (lastText != null) {
      const textNode: TextNode = { type: "text", text: lastText };
      if (lastTextId != null) {textNode.id = lastTextId;}
      results.push(textNode);
    }
    return results;
  }
}
