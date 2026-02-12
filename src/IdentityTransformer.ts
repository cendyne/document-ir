import type {
  ArrayNode,
  BlockNode,
  BlockQuoteNode,
  BoldNode,
  BreakNode,
  BubbleNode,
  CardAttribution,
  CardContent,
  CardHeader,
  CardMedia,
  CardNode,
  CenterNode,
  CodeNode,
  CodeGroupNode,
  CodeGroupTabNode,
  ColumnsNode,
  DateNode,
  DateTimeNode,
  DefinitionListNode,
  DefinitionNode,
  DefinitionReferenceNode,
  DocumentNode,
  EmbedNode,
  EmojiNode,
  FigureCaptionNode,
  FigureImageNode,
  FigureNode,
  FormattedTextNode,
  HeaderNode,
  HighTechAlertNode,
  HorizontalRuleNode,
  ImageNode,
  ItalicNode,
  LinkNode,
  ListItem,
  ListNode,
  Node,
  NoteNode,
  PillNode,
  TimeRangeNode,
  ParagraphNode,
  QuoteNode,
  RedactedNode,
  RegionNode,
  ScriptNode,
  SecretNode,
  StyleNode,
  SmallerNode,
  SocialNode,
  StandardNode,
  StickerNode,
  StrikeThroughNode,
  SubTextNode,
  SuperTextNode,
  TableCellNode,
  TableNode,
  TableOfContentsNode,
  TextNode,
  TimeNode,
  UnderlineNode,
  VideoNode,
  WarningNode,
} from "./types.ts";

export class IdentityTransformer {
  protected async beforeBlock(): Promise<void> {
  }
  protected async afterBlock(): Promise<void> {
  }
  protected async beforeInline(): Promise<void> {
  }
  protected async afterInline(): Promise<void> {
  }
  protected async chooseChildren(nodes: Node[]): Promise<Node[]> {
    const children: Node[] = [];
    for (const child of nodes) {
      const resultNode = await this.choose(child);
      if (resultNode) {
        children.push(resultNode);
      }
    }
    return children;
  }
  protected async block(node: BlockNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: BlockNode = {
      type: "block",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async blockQuote(node: BlockQuoteNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: BlockQuoteNode = {
      type: "block-quote",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async bold(node: BoldNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    const result: BoldNode = {
      type: "bold",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async break_(node: BreakNode): Promise<Node | null> {
    await this.beforeBlock();
    await this.afterBlock();
    const result: BreakNode = {
      type: "break",
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async bubble(node: BubbleNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: BubbleNode = {
      type: "bubble",
      orientation: node.orientation || "left",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async center(node: CenterNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: CenterNode = {
      type: "center",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async code(node: CodeNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    const result: CodeNode = {
      type: "code",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async codeGroupTab(node: CodeGroupTabNode): Promise<CodeGroupTabNode> {
    await this.beforeInline();
    const header = await this.chooseChildren(node.header);
    await this.afterInline();
    const content = await this.code(node.content) as CodeNode;
    const result: CodeGroupTabNode = {
      type: "code-group-tab",
      header,
      content,
    };
    if (node.copyable != null) {result.copyable = node.copyable;}
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async codeGroup(node: CodeGroupNode): Promise<Node | null> {
    const tabs: CodeGroupTabNode[] = [];
    for (const tab of node.tabs) {
      tabs.push(await this.codeGroupTab(tab));
    }
    const result: CodeGroupNode = {
      type: "code-group",
      tabs,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async columns(node: ColumnsNode): Promise<Node | null> {
    const columns: Node[][] = [];
    for (const column of node.columns) {
      await this.beforeBlock();
      columns.push(await this.chooseChildren(column));
      await this.afterBlock();
    }

    const result: ColumnsNode = {
      type: "columns",
      columns,
      "column-count": node["column-count"],
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async definition(
    node: DefinitionNode,
  ): Promise<DefinitionNode | null> {
    await this.beforeBlock();
    const abbreviation = await this.chooseChildren(node.abbreviation);
    await this.afterBlock();
    await this.beforeBlock();
    const title = await this.chooseChildren(node.title);
    await this.afterBlock();
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: DefinitionNode = {
      type: "definition",
      abbreviation,
      title,
      content,
      key: node.key,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async definitionList(
    node: DefinitionListNode,
  ): Promise<Node | null> {
    await this.beforeBlock();
    const children: DefinitionNode[] = [];
    for (const child of node.content) {
      const resultNode = await this.definition(child);
      if (resultNode) {
        children.push(resultNode);
      }
    }
    await this.afterBlock();
    const result: DefinitionListNode = {
      type: "definition-list",
      content: children,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async definitionReference(
    node: DefinitionReferenceNode,
  ): Promise<Node | null> {
    await this.beforeInline();
    const abbreviation = await this.chooseChildren(
      node.definition.abbreviation,
    );
    await this.afterInline();
    const result: DefinitionReferenceNode = {
      type: "definition-reference",
      definition: {
        abbreviation,
        key: node.definition.key,
      },
      content: await this.chooseChildren(node.content),
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async embed(node: EmbedNode): Promise<Node | null> {
    const result: EmbedNode = {
      type: "embed",
      content: {
        ...node.content,
      },
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async emoji(node: EmojiNode): Promise<Node | null> {
    const result: EmojiNode = {
      type: "emoji",
      url: node.url,
      alt: node.alt,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async figure(node: FigureNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: FigureNode = {
      type: "figure",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async figureCaption(node: FigureCaptionNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: FigureCaptionNode = {
      type: "figure-caption",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async figureImage(node: FigureImageNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: FigureImageNode = {
      type: "figure-image",
      alt: node.alt || "",
      url: node.url,
      content,
    };
    if (node.id != null) {result.id = node.id;}
    if (node.blurhash) {
      result.blurhash = node.blurhash;
    }
    if (node.height) {
      result.height = node.height;
    }
    if (node.width) {
      result.width = node.width;
    }
    if (node.hero) {
      result.hero = node.hero;
    }
    if (node.image) {
      result.image = node.image;
    }
    return result;
  }
  protected async formattedText(node: FormattedTextNode): Promise<Node | null> {
    await this.beforeBlock();
    await this.afterBlock();
    const result: FormattedTextNode = {
      type: "formatted-text",
      text: node.text || "",
      language: node.language,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async header(node: HeaderNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: HeaderNode = {
      type: "header",
      content,
      level: node.level || 2,
    };
    if (node.id != null) {result.id = node.id;}
    if (node.htmlId) {
      result.htmlId = node.htmlId;
    }
    return result;
  }
  protected async highTechAlert(node: HighTechAlertNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    await this.beforeBlock();
    const warning = await this.chooseChildren(node.warning);
    await this.afterBlock();
    const result: HighTechAlertNode = {
      type: "high-tech-alert",
      content,
      warning,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }

  protected async horizontalRule(
    node: HorizontalRuleNode,
  ): Promise<Node | null> {
    await this.beforeBlock();
    await this.afterBlock();
    const result: HorizontalRuleNode = {
      type: "horizontal-rule",
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async image(node: ImageNode): Promise<Node | null> {
    await this.beforeBlock();
    await this.afterBlock();
    const result: ImageNode = {
      type: "image",
      alt: node.alt || "",
      url: node.url,
    };
    if (node.id != null) {result.id = node.id;}
    if (node.hero) {
      result.hero = node.hero;
    }
    if (node.blurhash) {
      result.blurhash = node.blurhash;
    }
    if (node.height) {
      result.height = node.height;
    }
    if (node.width) {
      result.width = node.width;
    }
    if (node.image) {
      result.image = node.image;
    }
    return result;
  }
  protected async italic(node: ItalicNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    const result: ItalicNode = {
      type: "italic",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async link(node: LinkNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    const result: LinkNode = {
      type: "link",
      content,
      url: node.url,
    };
    if (node.id != null) {result.id = node.id;}
    if (node.title) {
      result.title = node.title;
    }
    if (node.target) {
      result.target = node.target;
    }
    if (node.userGeneratedContent) {
      result.userGeneratedContent = node.userGeneratedContent;
    }
    if (node.noReferrer) {
      result.noReferrer = node.noReferrer;
    }
    if (node.noFollow) {
      result.noFollow = node.noFollow;
    }
    if (node.noOpener) {
      result.noOpener = node.noOpener;
    }
    return result;
  }
  protected async array(node: ArrayNode): Promise<Node | null> {
    const result: ArrayNode = {
      type: "array",
      content: await this.chooseChildren(node.content),
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async note(node: NoteNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: NoteNode = {
      type: "note",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }

  protected async list(node: ListNode): Promise<Node | null> {
    const content: ListItem[] = [];
    for (const item of node.content) {
      await this.beforeBlock();
      const children = await this.chooseChildren(item.content);
      await this.afterBlock();
      if (children && children.length > 0) {
        const listItem: ListItem = {
          type: "list-item",
          content: children,
        };
        if (item.id != null) {listItem.id = item.id;}
        content.push(listItem);
      }
    }
    const result: ListNode = {
      type: "list",
      style: node.style || "unordered",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async paragraph(node: ParagraphNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: ParagraphNode = {
      type: "paragraph",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async pill(node: PillNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    const result: PillNode = {
      type: "pill",
      color: node.color,
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async quote(node: QuoteNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: QuoteNode = {
      type: "quote",
      icon: node.icon,
      name: node.name,
      content,
      url: node.url,
    };
    if (node.id != null) {result.id = node.id;}
    if (node.orientation) {
      result.orientation = node.orientation;
    }
    return result;
  }
  protected async redacted(node: RedactedNode): Promise<Node | null> {
    if (node.style == "block") {
      await this.beforeBlock();
    } else {
      await this.beforeInline();
    }
    const content = await this.chooseChildren(node.content);
    if (node.style == "block") {
      await this.afterBlock();
    } else {
      await this.afterInline();
    }
    const result: RedactedNode = {
      type: "redacted",
      style: node.style,
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async region(node: RegionNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: RegionNode = {
      type: "region",
      mode: node.mode,
      regions: node.regions,
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async script(node: ScriptNode): Promise<Node | null> {
    const result: ScriptNode = {
      type: "script",
      "mime-type": node["mime-type"] || "text/javascript",
      source: node.source,
    };
    if (node.url) {result.url = node.url;}
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async style(node: StyleNode): Promise<Node | null> {
    const result: StyleNode = {
      type: "style",
    };
    if (node.source) {result.source = node.source;}
    if (node.url) {result.url = node.url;}
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async secret(node: SecretNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    const result: SecretNode = {
      type: "secret",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async smaller(node: SmallerNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    const result: SmallerNode = {
      type: "smaller",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async sticker(node: StickerNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: StickerNode = {
      type: "sticker",
      orientation: node.orientation,
      character: node.character,
      name: node.name,
      content,
    };
    if (node.id != null) {result.id = node.id;}
    if (node.size) {
      result.size = node.size;
    }
    if (node.width) {
      result.width = node.width;
    }
    if (node.height) {
      result.height = node.height;
    }
    return result;
  }
  protected async strikeThrough(node: StrikeThroughNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    const result: StrikeThroughNode = {
      type: "strike-through",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async standard(node: StandardNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    const result: StandardNode = {
      type: "standard",
      standard: node.standard,
      identifier: node.identifier,
      url: node.url,
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async text(node: TextNode): Promise<Node | null> {
    const result: TextNode = {
      type: "text",
      text: node.text,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }

  protected async table(node: TableNode): Promise<Node | null> {
    const content: TableCellNode[][] = [];
    for (const row of node.content) {
      const cells: TableCellNode[] = [];
      let emptyCount = 0;
      for (const cell of row) {
        await this.beforeBlock();
        const children = await this.chooseChildren(cell.content);
        await this.afterBlock();
        if (children && children.length == 0) {
          emptyCount++;
        }
        const cellResult: TableCellNode = {
          type: "table-cell",
          span: [cell.span[0] || 1, cell.span[1] || 1],
          content: children,
        };
        if (cell.id != null) {cellResult.id = cell.id;}
        if (cell.header) {
          cellResult.header = cell.header;
        }
        cells.push(cellResult);
      }
      if (cells.length > 0 && emptyCount != cells.length) {
        content.push(cells);
      }
    }
    const result: TableNode = {
      type: "table",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async social(node: SocialNode): Promise<Node | null> {
    await this.beforeBlock();
    await this.afterBlock();
    return {
      type: node.type,
      id: node.id,
    };
  }
  protected async underline(node: UnderlineNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    const result: UnderlineNode = {
      type: "underline",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async video(node: VideoNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = node.content && await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: VideoNode = {
      type: "video",
      alt: node.alt,
      mp4: node.mp4,
      poster: node.poster,
    };
    if (node.id != null) {result.id = node.id;}
    if (node.autoplay) {
      result.autoplay = node.autoplay;
    }
    if (node.blurhash) {
      result.blurhash = node.blurhash;
    }
    if (content) {
      result.content = content;
    }
    if (node.controls) {
      result.controls = node.controls;
    }
    if (node.height) {
      result.height = node.height;
    }
    if (node.width) {
      result.width = node.width;
    }
    if (node.loop) {
      result.loop = node.loop;
    }
    if (node.muted) {
      result.muted = node.muted;
    }
    if (node.webm) {
      result.webm = node.webm;
    }
    return result;
  }
  protected async warning(node: WarningNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: WarningNode = {
      type: "warning",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async card(node: CardNode): Promise<Node | null> {
    let content: CardContent | undefined;
    if (node.content) {
      await this.beforeBlock();
      const cardContent = await this.chooseChildren(node.content.content);
      if (cardContent && cardContent.length > 0) {
        content = {
          type: "card-content",
          content: cardContent,
        };
        if (node.content.id != null) {content.id = node.content.id;}
      }
      await this.afterBlock();
    }
    let attribution: CardAttribution | undefined;
    if (node.attribution) {
      attribution = {
        type: "card-attribution",
      };
      if (node.attribution.id != null) {attribution.id = node.attribution.id;}
      if (node.attribution.archiveUrl) {
        attribution.archiveUrl = node.attribution.archiveUrl;
      }
      if (node.attribution.url) {
        attribution.url = node.attribution.url;
      }
      if (node.attribution.date) {
        attribution.date = node.attribution.date;
      }
      if (node.attribution.title) {
        await this.beforeBlock();
        const title = await this.chooseChildren(node.attribution.title);
        await this.afterBlock();
        attribution.title = title;
      }
    }
    let header: CardHeader | undefined;
    if (node.header) {
      await this.beforeBlock();
      const title = await this.chooseChildren(node.header.title);
      await this.afterBlock();
      header = {
        type: "card-header",
        title,
        backgroundBlurhash: node.header.backgroundBlurhash,
        backgroundColor: node.header.backgroundColor,
        backgroundImage: node.header.backgroundImage,
        imageUrl: node.header.imageUrl,
        imageBlurhash: node.header.imageBlurhash,
      };
      if (node.header.id != null) {header.id = node.header.id;}
      if (node.header.url) {
        header.url = node.header.url;
      }
      if (node.header.username) {
        header.username = node.header.username;
      }
      if (node.header.usernameDomain) {
        header.usernameDomain = node.header.usernameDomain;
      }
    }
    let media: CardMedia | undefined;
    if (node.media) {
      const mediaContent: (VideoNode | ImageNode | EmbedNode)[] = [];
      for (const mediaNode of node.media.content) {
        await this.beforeBlock();
        const transformedNode = await this.choose(mediaNode);
        if (transformedNode) {
          if (
            transformedNode.type == "image" ||
            transformedNode.type == "video" ||
            transformedNode.type == "embed"
          ) {
            mediaContent.push(transformedNode);
          }
        }
        await this.afterBlock();
      }
      if (mediaContent.length > 0) {
        media = {
          type: "card-media",
          content: mediaContent,
        };
        if (node.media.id != null) {media.id = node.media.id;}
      }
    }

    const result: CardNode = {
      type: "card",
      content,
      attribution,
      header,
      media,
      original: node.original,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async date(node: DateNode): Promise<Node | null> {
    await this.beforeInline();
    const content = node.content && await this.chooseChildren(node.content);
    await this.afterInline();
    const result: DateNode = {
      type: "date",
      isoDate: node.isoDate,
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async time(node: TimeNode): Promise<Node | null> {
    await this.beforeInline();
    const content = node.content && await this.chooseChildren(node.content);
    await this.afterInline();
    const result: TimeNode = {
      type: "time",
      isoTime: node.isoTime,
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async datetime(node: DateTimeNode): Promise<Node | null> {
    await this.beforeInline();
    const content = node.content && await this.chooseChildren(node.content);
    await this.afterInline();
    const result: DateTimeNode = {
      type: "datetime",
      iso8601: node.iso8601,
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async subText(node: SubTextNode): Promise<Node | null> {
    await this.beforeInline();
    const content = node.content && await this.chooseChildren(node.content);
    await this.afterInline();
    const result: SubTextNode = {
      type: "sub",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async superText(node: SuperTextNode): Promise<Node | null> {
    await this.beforeInline();
    const content = node.content && await this.chooseChildren(node.content);
    await this.afterInline();
    const result: SuperTextNode = {
      type: "super",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    return result;
  }
  protected async toc(node: TableOfContentsNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    const date = node.date && await this.choose(node.date);
    await this.afterBlock();
    await this.beforeBlock();
    const mixedChildren = await this.chooseChildren(node.children);
    await this.afterBlock();
    const children = mixedChildren.filter((x) =>
      x.type == "toc"
    ) as TableOfContentsNode[];
    const result: TableOfContentsNode = {
      type: "toc",
      content,
      children,
    };
    if (node.id != null) {result.id = node.id;}
    if (
      date &&
      (date.type == "date" || date.type == "time" || date.type == "datetime")
    ) {
      result.date = date;
    }
    if (node.href) {
      result.href = node.href;
    }
    if (node.hrefHtmlId) {
      result.hrefHtmlId = node.hrefHtmlId;
    }
    return result;
  }
  protected async timeRange(node: TimeRangeNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result: TimeRangeNode = {
      type: "time-range",
      content,
    };
    if (node.id != null) {result.id = node.id;}
    if (node.notBefore) {
      result.notBefore = node.notBefore;
    }
    if (node.notAfter) {
      result.notAfter = node.notAfter;
    }
    return result;
  }
  protected async choose(node: Node): Promise<Node | null> {
    if (!node || !node.type) {
      throw new Error(`Unexpected node, no type: ${JSON.stringify(node)}`);
    }
    try {
      switch (node.type) {
        case "block":
          return await this.block(node);
        case "block-quote":
          return await this.blockQuote(node);
        case "bold":
          return await this.bold(node);
        case "break":
          return await this.break_(node);
        case "bubble":
          return await this.bubble(node);
        case "card":
          return await this.card(node);
        case "center":
          return await this.center(node);
        case "code":
          return await this.code(node);
        case "code-group":
          return await this.codeGroup(node);
        case "columns":
          return await this.columns(node);
        case "definition":
          return await this.definition(node);
        case "definition-list":
          return await this.definitionList(node);
        case "definition-reference":
          return await this.definitionReference(node);
        case "embed":
          return await this.embed(node);
        case "emoji":
          return await this.emoji(node);
        case "figure":
          return await this.figure(node);
        case "figure-caption":
          return await this.figureCaption(node);
        case "figure-image":
          return await this.figureImage(node);
        case "formatted-text":
          return await this.formattedText(node);
        case "header":
          return await this.header(node);
        case "high-tech-alert":
          return await this.highTechAlert(node);
        case "horizontal-rule":
          return await this.horizontalRule(node);
        case "image":
          return await this.image(node);
        case "italic":
          return await this.italic(node);
        case "link":
          return await this.link(node);
        case "array":
          return await this.array(node);
        case "note":
          return await this.note(node);
        case "list":
          return await this.list(node);
        case "paragraph":
          return await this.paragraph(node);
        case "pill":
          return await this.pill(node);
        case "quote":
          return await this.quote(node);
        case "redacted":
          return await this.redacted(node);
        case "region":
          return await this.region(node);
        case "script":
          return await this.script(node);
        case "secret":
          return await this.secret(node);
        case "style":
          return await this.style(node);
        case "smaller":
          return await this.smaller(node);
        case "sticker":
          return await this.sticker(node);
        case "standard":
          return await this.standard(node);
        case "strike-through":
          return await this.strikeThrough(node);
        case "table":
          return await this.table(node);
        case "text":
          return await this.text(node);
        case "toot":
        case "tweet":
        case "vimeo":
        case "youtube":
          return await this.social(node);
        case "underline":
          return await this.underline(node);
        case "video":
          return await this.video(node);
        case "warning":
          return await this.warning(node);
        case "date":
          return await this.date(node);
        case "time":
          return await this.time(node);
        case "datetime":
          return await this.datetime(node);
        case "super":
          return await this.superText(node);
        case "sub":
          return await this.subText(node);
        case "toc":
          return await this.toc(node);
        case "time-range":
          return await this.timeRange(node);
      }
    } catch (e) {
      console.log(
        `Got exception while processing node: ${JSON.stringify(node)}`,
      );
      throw e;
    }
    //@ts-ignore fall through
    console.error(`Unsupported type ${node.type}`);
    return null;
  }
  protected async document(node: DocumentNode): Promise<DocumentNode> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    await this.beforeBlock();
    const definitions = node.definitions &&
      ((await this.chooseChildren(node.definitions)).filter((x) =>
        x.type == "definition"
      ) as DefinitionNode[]);
    const hierarchy = node.hierarchy;
    await this.afterBlock();
    const result: DocumentNode = {
      type: "document",
      title: node.title,
      content,
      url: node.url,
    };
    if (node.image) {
      result.image = node.image;
    }
    if (node.guid) {
      result.guid = node.guid;
    }
    if (node["pub-date"]) {
      result["pub-date"] = node["pub-date"];
    }
    if (node.description) {
      result.description = node.description;
    }
    if (node.date) {
      result.date = node.date;
    }
    if (hierarchy) {
      result.hierarchy = hierarchy;
    }
    if (definitions) {
      result.definitions = definitions;
    }
    if (node.noindex) {
      result.noindex = node.noindex;
    }
    if (node.author) {
      result.author = node.author;
    }
    if (node.hidden) {
      result.hidden = node.hidden;
    }
    if (node.readingDifficultyMultiplier) {
      result.readingDifficultyMultiplier = node.readingDifficultyMultiplier;
    }
    if (node.contentDigest) {
      result.contentDigest = node.contentDigest;
    }
    if (node.keywords) {
      result.keywords = node.keywords;
    }
    return result;
  }
  async transform(node: DocumentNode): Promise<DocumentNode> {
    return await this.document(node);
  }
}
