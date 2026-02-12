import { IdentityTransformer } from "./IdentityTransformer.ts";
import type { DocumentNode, Node, TextNode } from "./types.ts";

interface BlockInfo {
  type: "_block";
  content: WhiteSpaceContainer[];
  parent: BlockInfo | InlineInfo | null;
}

interface InlineInfo {
  type: "_inline";
  content: WhiteSpaceContainer[];
  parent: BlockInfo | InlineInfo | null;
}

type WhiteSpaceContainer = BlockInfo | InlineInfo | TextNode;

interface TextLevel {
  node: TextNode | null;
  level: number;
}

export class WhitespaceStretchingTransformer extends IdentityTransformer {
  private root: BlockInfo;
  private cursor: BlockInfo | InlineInfo;
  constructor() {
    super();
    this.root = {
      type: "_block",
      content: [],
      parent: null,
    };
    this.cursor = this.root;
  }
  protected override async beforeBlock(): Promise<void> {
    const parent = this.cursor;
    const block: BlockInfo = {
      type: "_block",
      content: [],
      parent,
    };
    parent.content.push(block);
    this.cursor = block;
  }
  protected override async afterBlock(): Promise<void> {
    if (this.cursor.parent) {
      this.cursor = this.cursor.parent;
    }
  }
  protected override async beforeInline(): Promise<void> {
    const parent = this.cursor;
    const inline: InlineInfo = {
      type: "_inline",
      content: [],
      parent,
    };
    parent.content.push(inline);
    this.cursor = inline;
  }
  protected override async afterInline(): Promise<void> {
    if (this.cursor.parent) {
      this.cursor = this.cursor.parent;
    }
  }
  protected reviewBlock(block: BlockInfo) {
    const nodes: TextLevel[] = [];
    const visit = (r: WhiteSpaceContainer, level: number) => {
      if (r.type == "text") {
        nodes.push({
          node: r,
          level,
        });
      } else if (r.type == "_block") {
        this.reviewBlock(r);
        nodes.push({ node: null, level });
      } else {
        for (const node of r.content) {
          visit(node, level + 1);
        }
      }
    };
    for (const node of block.content) {
      visit(node, 0);
    }
    for (let i = 0; i < nodes.length; i++) {
      const first = nodes[i]!;
      const second = i + 1 < nodes.length
        ? nodes[i + 1]!
        : { node: null, level: 0 };
      // No use acting on a dead node
      if (!first.node || !second.node) {
        continue;
      }
      // Interesting things only happen on differing levels
      if (first.level == second.level) {
        continue;
      }
      if (first.level < second.level) {
        if (second.node.text.startsWith(" ")) {
          second.node.text = second.node.text.slice(1);
          first.node.text += " ";
        }
      } else if (first.level > second.level) {
        if (first.node.text.endsWith(" ")) {
          first.node.text = first.node.text.slice(0, -1);
          second.node.text = ` ${second.node.text}`;
        }
      }
    }
  }
  protected override async text(node: TextNode): Promise<Node | null> {
    const replacement: TextNode = {
      type: "text",
      text: `${node.text}`,
    };
    this.cursor.content.push(replacement);
    return replacement;
  }
  public override async transform(node: DocumentNode): Promise<DocumentNode> {
    const result = await super.transform(node);
    this.reviewBlock(this.root);
    return result;
  }
}
