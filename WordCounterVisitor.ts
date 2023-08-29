import { NodeVisitor } from "./index.ts";
import { DocumentNode, TextNode } from "./types.ts";

export class WordCounterVisitor extends NodeVisitor {
  private count: number;
  private texts: string[];
  constructor() {
    super();
    this.count = 0;
    this.texts = [];
  }
  private countText() {
    if (this.texts.length > 0) {
      this.count += this.texts.join("").split(" ").length;
      this.texts = [];
    }
  }
  protected beforeBlock(): void {
    this.countText();
  }
  protected afterBlock(): void {
    this.countText();
  }
  protected text(node: TextNode): void {
    this.texts.push(node.text);
  }
  protected document(node: DocumentNode): void {
    super.document(node);
    this.countText();
  }
  public getCount(): number {
    this.countText();
    return this.count;
  }
}
