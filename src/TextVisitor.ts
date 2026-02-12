import type {
  DefinitionNode,
  DefinitionReferenceNode,
  EmojiNode,
  FigureImageNode,
  ImageNode,
  TableOfContentsNode,
  TextNode,
  VideoNode,
} from "./types.ts";
import { NodeVisitor } from "./NodeVisitor.ts";

export class TextVisitor extends NodeVisitor {
  private textList: string[];
  constructor() {
    super();
    this.textList = [];
  }
  protected override text(node: TextNode) {
    this.textList.push(node.text);
    super.text(node);
  }
  protected override video(node: VideoNode) {
    this.textList.push(node.alt);
    super.video(node);
  }
  protected override image(node: ImageNode) {
    this.textList.push(node.alt);
    super.image(node);
  }
  protected override emoji(node: EmojiNode) {
    this.textList.push(node.alt);
    super.emoji(node);
  }
  protected override figureImage(node: FigureImageNode) {
    this.textList.push(node.alt);
    super.figureImage(node);
  }
  protected override definitionReference(node: DefinitionReferenceNode): void {
    this.chooseChildren(node.content);
  }
  protected override definition(node: DefinitionNode): void {
    this.chooseChildren(node.title);
    this.textList.push(" (");
    this.chooseChildren(node.abbreviation);
    this.textList.push("): ");
    this.chooseChildren(node.content);
  }
  protected override toc(node: TableOfContentsNode): void {
    if (node.date) {
      this.choose(node.date);
      this.textList.push(" ");
    }
    this.chooseChildren(node.content);
    this.textList.push("\n");
    this.chooseChildren(node.children);
  }
  getText(): string {
    return this.textList.join("");
  }
}
