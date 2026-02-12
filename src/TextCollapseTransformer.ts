import { IdentityTransformer } from "./IdentityTransformer.ts";
import type { Node } from "./types.ts";

export class TextCollapseTransformer extends IdentityTransformer {
  protected override async chooseChildren(nodes: Node[]): Promise<Node[]> {
    const children = await super.chooseChildren(nodes);
    const results: Node[] = [];
    let lastText: null | string = null;
    for (const child of children) {
      if (child.type == "text") {
        if (lastText != null) {
          lastText = `${lastText}${child.text}`;
        } else {
          lastText = child.text;
        }
      } else {
        if (lastText != null) {
          results.push({
            type: "text",
            text: lastText,
          });
          lastText = null;
        }
        results.push(child);
      }
    }
    if (lastText != null) {
      results.push({
        type: "text",
        text: lastText,
      });
      lastText = null;
    }
    return results;
  }
}
