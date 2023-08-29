import { ArrayCollapseTransformer } from "./index.ts";
import {
  BubbleNode,
  CardNode,
  ColumnsNode,
  DefinitionListNode,
  FigureImageNode,
  HighTechAlertNode,
  ImageNode,
  Node,
  NoteNode,
  QuoteNode,
  RedactedNode,
  StickerNode,
  VideoNode,
} from "./types.ts";

export class DocumentThinningTransformer extends ArrayCollapseTransformer {
  protected async sticker(node: StickerNode): Promise<Node | null> {
    if (node.content.length == 0) {
      return null;
    }
    const content = await this.chooseChildren(node.content);
    if (!content) {
      return null;
    }
    return {
      type: "paragraph",
      content,
    };
  }
  protected async bubble(node: BubbleNode): Promise<Node | null> {
    if (node.content.length == 0) {
      return null;
    }
    const content = await this.chooseChildren(node.content);
    if (!content) {
      return null;
    }
    return {
      type: "paragraph",
      content,
    };
  }
  protected async highTechAlert(node: HighTechAlertNode): Promise<Node | null> {
    if (node.content.length == 0) {
      return null;
    }
    const content = await this.chooseChildren(node.content);
    if (!content) {
      return null;
    }
    return {
      type: "array",
      content,
    };
  }
  protected async columns(node: ColumnsNode): Promise<Node | null> {
    const flattened = node.columns.flat();
    if (flattened.length == 0) {
      return null;
    }
    const content = await this.chooseChildren(flattened);
    if (!content) {
      return null;
    }
    return {
      type: "array",
      content,
    };
  }
  protected async quote(node: QuoteNode): Promise<Node | null> {
    if (node.content.length == 0) {
      return null;
    }
    const content = await this.chooseChildren(node.content);
    if (!content) {
      return null;
    }
    return {
      type: "array",
      content,
    };
  }
  protected image(node: ImageNode): Promise<Node | null> {
    return Promise.resolve({
      type: "paragraph",
      content: [{
        type: "text",
        text: "inline image: ",
      }, {
        type: "text",
        text: node.alt,
      }],
    });
  }
  protected async figureImage(node: FigureImageNode): Promise<Node | null> {
    const image: Node = {
      type: "paragraph",
      content: [{
        type: "text",
        text: "inline image: ",
      }, {
        type: "text",
        text: node.alt,
      }],
    };
    if (node.content) {
      const content = await this.chooseChildren(node.content);
      return {
        type: "array",
        content: [
          image,
          ...content,
        ],
      };
    } else {
      return image;
    }
  }
  protected async video(node: VideoNode): Promise<Node | null> {
    const video: Node = {
      type: "paragraph",
      content: [{
        type: "text",
        text: "inline video: ",
      }, {
        type: "text",
        text: node.alt,
      }],
    };
    if (node.content) {
      const content = await this.chooseChildren(node.content);
      return {
        type: "array",
        content: [
          video,
          ...content,
        ],
      };
    } else {
      return video;
    }
  }

  protected async definitionList(
    node: DefinitionListNode,
  ): Promise<Node | null> {
    const content: Node[] = [];
    for (const d of node.content) {
      const defContent: Node[] = [];
      const title = await this.chooseChildren(d.title);
      if (title) {
        for (const n of title) {
          defContent.push(n);
        }
      }
      defContent.push({ type: "text", text: " " });
      const abbreviation = await this.chooseChildren(d.abbreviation);
      if (abbreviation) {
        for (const n of abbreviation) {
          defContent.push(n);
        }
      }
      if (d.content.length > 0 && d.content[0].type != "paragraph") {
        defContent.push({ type: "text", text: " " });
        const def = await this.chooseChildren(d.content);
        if (def) {
          for (const n of def) {
            defContent.push(n);
          }
        }
      }
      content.push({
        type: "paragraph",
        content: defContent,
      });

      if (d.content.length > 0 && d.content[0].type == "paragraph") {
        const def = await this.chooseChildren(d.content);
        if (def) {
          for (const n of def) {
            content.push(n);
          }
        }
      }
    }
    return {
      type: "array",
      content,
    };
  }
  // deno-lint-ignore require-await
  protected async redacted(_node: RedactedNode): Promise<Node | null> {
    return null;
  }

  protected async note(node: NoteNode): Promise<Node | null> {
    if (node.content.length == 0) {
      return null;
    }
    const content = await this.chooseChildren(node.content);
    if (!content) {
      return null;
    }
    return {
      type: "paragraph",
      content: [
        { type: "text", text: "Note: " },
        ...content,
      ],
    };
  }
  protected async card(node: CardNode): Promise<Node | null> {
    const content: Node[] = [];

    if (node.header) {
      const title = await this.chooseChildren(node.header.title);
      if (title.length > 0) {
        content.push({
          type: "paragraph",
          content: title,
        });
      }
    }

    if (node.content) {
      const card = await this.chooseChildren(node.content.content);
      for (const c of card) {
        content.push(c);
      }
    }

    if (node.media) {
      for (const media of node.media.content) {
        const m = await this.choose(media);
        if (m) {
          content.push(m);
        }
      }
    }

    if (node.attribution) {
      const attribution: Node[] = [];
      if (node.attribution.title) {
        const title = await this.chooseChildren(node.attribution.title);
        for (const n of title) {
          content.push(n);
        }
      }
      if (node.attribution.date) {
        if (content.length > 0) {
          content.push({ type: "text", text: " " });
        }
        content.push({ type: "text", text: `${node.attribution.date}` });
      }
      if (attribution.length > 0) {
        content.push({
          type: "paragraph",
          content: attribution,
        });
      }
    }

    return {
      type: "array",
      content: content,
    };
  }
}
