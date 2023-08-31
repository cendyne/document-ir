import {
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
  protected text(node: TextNode) {
    this.textList.push(node.text);
    super.text(node);
  }
  protected video(node: VideoNode) {
    this.textList.push(node.alt);
    super.video(node);
  }
  protected image(node: ImageNode) {
    this.textList.push(node.alt);
    super.image(node);
  }
  protected emoji(node: EmojiNode) {
    this.textList.push(node.alt);
    super.emoji(node);
  }
  protected figureImage(node: FigureImageNode) {
    this.textList.push(node.alt);
    super.figureImage(node);
  }
  protected definitionReference(node: DefinitionReferenceNode): void {
    this.chooseChildren(node.content);
  }
  protected definition(node: DefinitionNode): void {
    this.chooseChildren(node.title);
    this.textList.push(" (");
    this.chooseChildren(node.abbreviation);
    this.textList.push("): ");
    this.chooseChildren(node.content);
  }
  protected toc(node: TableOfContentsNode): void {
    if (node.date) {
      this.choose(node.date);
      this.textList.push(' ');
    }
    this.chooseChildren(node.content);
    this.textList.push("\n");
    this.chooseChildren(node.children);
  }
  getText(): string {
    return this.textList.join("");
  }
}
