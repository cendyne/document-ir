import { IdentityTransformer } from "./IdentityTransformer.ts";
import type { CodeNode, DocumentNode, Node, TextNode } from "./types.ts";

class RemoveEmptyTextTransformer extends IdentityTransformer {
  protected override async text(node: TextNode): Promise<Node | null> {
    if (node.text == "") {
      return null;
    }
    return node;
  }
}

export class WhitespaceTransformer extends IdentityTransformer {
  private stripWhitespace: boolean;
  private lastText: TextNode | null;
  constructor() {
    super();
    this.stripWhitespace = true;
    this.lastText = null;
  }
  protected override async text(node: TextNode): Promise<Node | null> {
    let result = "";
    for (const c of node.text) {
      if (c == " " || c == "\n" || c == "\t" || c == "\r") {
        if (!this.stripWhitespace) {
          result += " ";
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
    const text: TextNode = {
      type: "text",
      text: result,
    };
    if (node.id != null) {text.id = node.id;}
    this.lastText = text;
    return text;
  }
  private stripLastText() {
    if (this.lastText) {
      if (this.lastText.text.endsWith(" ")) {
        this.lastText.text = this.lastText.text.slice(0, -1);
      }
      this.lastText = null;
    }
    this.stripWhitespace = true;
  }
  protected override async code(node: CodeNode): Promise<Node | null> {
    const result: CodeNode = {
      type: "code",
      content: node.content,
    };
    if (node.language != null) {result.language = node.language;}
    if (node.diff != null) {result.diff = node.diff;}
    if (node.lineNumbers != null) {result.lineNumbers = node.lineNumbers;}
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected override async beforeBlock(): Promise<void> {
    this.stripLastText();
  }
  protected override async afterBlock(): Promise<void> {
    this.stripLastText();
  }
  override async transform(node: DocumentNode): Promise<DocumentNode> {
    const result = await super.transform(node);
    return await new RemoveEmptyTextTransformer().transform(result);
  }
}
