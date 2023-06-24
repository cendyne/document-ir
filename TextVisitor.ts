import {
  EmojiNode,
  FigureImageNode,
  ImageNode,
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
  getText(): string {
    return this.textList.join("");
  }
}
