import { IdentityTransformer } from "./IdentityTransformer.ts";
import { DocumentNode, Node, TextNode } from "./types.ts";

class RemoveEmptyTextTransformer extends IdentityTransformer {
  protected async text(node: TextNode): Promise<Node | null> {
    if (node.text == '') {
      return null;
    }
    return node;
  }
}

export class WhitespaceTransformer extends IdentityTransformer {
  private stripWhitespace: boolean;
  private lastText : TextNode | null;
  constructor() {
    super()
    this.stripWhitespace = true;
    this.lastText = null;
  }
  protected async text(node: TextNode): Promise<Node | null> {
    let result = '';
    for (let c of node.text) {
      if (c == ' ' || c == '\n' || c == '\t' || c == '\r') {
        if (!this.stripWhitespace) {
          result += ' ';
          this.stripWhitespace = true;
        }
      } else {
        result += c;
        this.stripWhitespace = false;
      }
    }
    if (result.length == 0) {
      return null;
    }
    let text : TextNode = {
      type: 'text',
      text: result
    }
    this.lastText = text;
    return text;
  }
  private stripLastText() {
    if (this.lastText) {
      if (this.lastText.text.endsWith(' ')) {
        this.lastText.text = this.lastText.text.slice(0, -1);
      }
      this.lastText = null;
    }
    this.stripWhitespace = true;
  }
  protected async beforeBlock(): Promise<void> {
    this.stripLastText();
  }
  protected async afterBlock(): Promise<void> {
    this.stripLastText();
  }
  async transform(node: DocumentNode): Promise<DocumentNode> {
    let result = await super.transform(node);
    return await new RemoveEmptyTextTransformer().transform(result);
  }
}
