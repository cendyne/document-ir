import { IdentityTransformer } from "./IdentityTransformer.ts";
import type { Node } from "./types.ts";

export class ArrayCollapseTransformer extends IdentityTransformer {
  protected override async chooseChildren(nodes: Node[]): Promise<Node[]> {
    const children = await super.chooseChildren(nodes);
    const results: Node[] = [];
    for (const child of children) {
      if (child.type == "array") {
        for (const arrayChild of child.content) {
          results.push(arrayChild);
        }
      } else {
        results.push(child);
      }
    }
    return results;
  }
}
