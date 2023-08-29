import {
  ArrayNode,
  BlockNode,
  BlockQuoteNode,
  BoldNode,
  BreakNode,
  BubbleNode,
  CardNode,
  CenterNode,
  CodeNode,
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
  ListNode,
  Node,
  NoteNode,
  ParagraphNode,
  QuoteNode,
  RedactedNode,
  RegionNode,
  ScriptNode,
  SecretNode,
  SmallerNode,
  SocialNode,
  StickerNode,
  StrikeThroughNode,
  SubTextNode,
  SuperTextNode,
  TableNode,
  TextNode,
  TimeNode,
  UnderlineNode,
  VideoNode,
  WarningNode,
} from "./types.ts";

export class NodeVisitor {
  protected beforeBlock(): void {
  }
  protected afterBlock(): void {
  }
  protected beforeInline(): void {
  }
  protected afterInline(): void {
  }
  protected chooseChildren(nodes: Node[]): void {
    for (const child of nodes) {
      this.choose(child);
    }
  }
  protected block(node: BlockNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected blockQuote(node: BlockQuoteNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected bold(node: BoldNode): void {
    this.beforeInline();
    this.chooseChildren(node.content);
    this.afterInline();
  }
  protected break_(_node: BreakNode): void {
    this.beforeBlock();
    this.afterBlock();
  }
  protected bubble(node: BubbleNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected center(node: CenterNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected code(node: CodeNode): void {
    this.beforeInline();
    this.chooseChildren(node.content);
    this.afterInline();
  }
  protected columns(node: ColumnsNode): void {
    for (const column of node.columns) {
      this.beforeBlock();
      this.chooseChildren(column);
      this.afterBlock();
    }
  }
  protected definition(node: DefinitionNode): void {
    this.beforeBlock();
    this.chooseChildren(node.abbreviation);
    this.afterBlock();
    this.beforeBlock();
    this.chooseChildren(node.title);
    this.afterBlock();
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected definitionList(node: DefinitionListNode): void {
    this.beforeBlock();
    for (const child of node.content) {
      this.definition(child);
    }
    this.afterBlock();
  }
  protected definitionReference(node: DefinitionReferenceNode): void {
    this.beforeInline();
    this.chooseChildren(node.definition.abbreviation);
    this.afterInline();
    this.chooseChildren(node.content);
  }
  protected embed(_node: EmbedNode): void {
  }
  protected emoji(_node: EmojiNode): void {
  }
  protected figure(node: FigureNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected figureCaption(node: FigureCaptionNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected figureImage(node: FigureImageNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected formattedText(_node: FormattedTextNode): void {
  }
  protected header(node: HeaderNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected highTechAlert(node: HighTechAlertNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
    this.beforeBlock();
    this.chooseChildren(node.warning);
    this.afterBlock();
  }
  protected horizontalRule(_node: HorizontalRuleNode): void {
  }
  protected image(_node: ImageNode): void {
  }
  protected italic(node: ItalicNode): void {
    this.beforeInline();
    this.chooseChildren(node.content);
    this.afterInline();
  }
  protected link(node: LinkNode): void {
    this.beforeInline();
    this.chooseChildren(node.content);
    this.afterInline();
  }
  protected array(node: ArrayNode): void {
    this.chooseChildren(node.content);
  }
  protected note(node: NoteNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected list(node: ListNode): void {
    for (const item of node.content) {
      this.beforeBlock();
      this.chooseChildren(item.content);
      this.afterBlock();
    }
  }
  protected paragraph(node: ParagraphNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected quote(node: QuoteNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected redacted(node: RedactedNode): void {
    if (node.style == "block") {
      this.beforeBlock();
    } else {
      this.beforeInline();
    }
    this.chooseChildren(node.content);
    if (node.style == "block") {
      this.afterBlock();
    } else {
      this.afterInline();
    }
  }
  protected region(node: RegionNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected script(_node: ScriptNode): void {
  }
  protected secret(node: SecretNode): void {
    this.beforeInline();
    this.chooseChildren(node.content);
    this.afterInline();
  }
  protected smaller(node: SmallerNode): void {
    this.beforeInline();
    this.chooseChildren(node.content);
    this.afterInline();
  }
  protected sticker(node: StickerNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected strikeThrough(node: StrikeThroughNode): void {
    this.beforeInline();
    this.chooseChildren(node.content);
    this.afterInline();
  }
  protected text(_node: TextNode): void {
  }
  protected table(node: TableNode): void {
    for (const row of node.content) {
      for (const cell of row) {
        this.beforeBlock();
        this.chooseChildren(cell.content);
        this.afterBlock();
      }
    }
  }
  protected social(_node: SocialNode): void {
  }
  protected underline(node: UnderlineNode): void {
    this.beforeInline();
    this.chooseChildren(node.content);
    this.afterInline();
  }
  protected video(node: VideoNode): void {
    this.beforeBlock();
    node.content && this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected warning(node: WarningNode): void {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
  }
  protected card(node: CardNode): void {
    if (node.content) {
      this.beforeBlock();
      this.chooseChildren(node.content.content);
      this.afterBlock();
    }
    if (node.attribution) {
      if (node.attribution.title) {
        this.beforeBlock();
        const _title = this.chooseChildren(node.attribution.title);
        this.afterBlock();
      }
    }
    if (node.header) {
      this.beforeBlock();
      this.chooseChildren(node.header.title);
      this.afterBlock();
    }
    if (node.media) {
      for (const mediaNode of node.media.content) {
        this.beforeBlock();
        this.choose(mediaNode);
        this.afterBlock();
      }
    }
  }
  protected date(node: DateNode): void {
    this.text({
      type: "text",
      text: node.isoDate,
    });
  }
  protected time(node: TimeNode): void {
    this.text({
      type: "text",
      text: node.isoTime,
    });
  }
  protected datetime(node: DateTimeNode): void {
    this.text({
      type: "text",
      text: node.iso8601,
    });
  }
  protected subText(node: SubTextNode): void {
    this.beforeInline();
    this.chooseChildren(node.content);
    this.afterInline();
  }
  protected superText(node: SuperTextNode): void {
    this.beforeInline();
    this.chooseChildren(node.content);
    this.afterInline();
  }
  protected choose(node: Node): void {
    if (!node || !node.type) {
      throw new Error(`Unexpected node, no type: ${JSON.stringify(node)}`);
    }
    try {
      switch (node.type) {
        case "block":
          return this.block(node);
        case "block-quote":
          return this.blockQuote(node);
        case "bold":
          return this.bold(node);
        case "break":
          return this.break_(node);
        case "bubble":
          return this.bubble(node);
        case "card":
          return this.card(node);
        case "center":
          return this.center(node);
        case "code":
          return this.code(node);
        case "columns":
          return this.columns(node);
        case "definition":
          return this.definition(node);
        case "definition-list":
          return this.definitionList(node);
        case "definition-reference":
          return this.definitionReference(node);
        case "embed":
          return this.embed(node);
        case "emoji":
          return this.emoji(node);
        case "figure":
          return this.figure(node);
        case "figure-caption":
          return this.figureCaption(node);
        case "figure-image":
          return this.figureImage(node);
        case "formatted-text":
          return this.formattedText(node);
        case "header":
          return this.header(node);
        case "high-tech-alert":
          return this.highTechAlert(node);
        case "horizontal-rule":
          return this.horizontalRule(node);
        case "image":
          return this.image(node);
        case "italic":
          return this.italic(node);
        case "link":
          return this.link(node);
        case "array":
          return this.array(node);
        case "note":
          return this.note(node);
        case "list":
          return this.list(node);
        case "paragraph":
          return this.paragraph(node);
        case "quote":
          return this.quote(node);
        case "redacted":
          return this.redacted(node);
        case "region":
          return this.region(node);
        case "script":
          return this.script(node);
        case "secret":
          return this.secret(node);
        case "smaller":
          return this.smaller(node);
        case "sticker":
          return this.sticker(node);
        case "strike-through":
          return this.strikeThrough(node);
        case "table":
          return this.table(node);
        case "text":
          return this.text(node);
        case "toot":
        case "tweet":
        case "vimeo":
        case "youtube":
          return this.social(node);
        case "underline":
          return this.underline(node);
        case "video":
          return this.video(node);
        case "warning":
          return this.warning(node);
        case "date":
          return this.date(node);
        case "time":
          return this.time(node);
        case "datetime":
          return this.datetime(node);
        case "sub":
          return this.subText(node);
        case "super":
          return this.superText(node);
      }
    } catch (e) {
      console.log(
        `Got exception while processing node: ${JSON.stringify(node)}`,
      );
      throw e;
    }
    //@ts-ignore Fall through
    console.error(`Unsupported type ${node.type}`);
  }
  protected document(node: DocumentNode) {
    this.beforeBlock();
    this.chooseChildren(node.content);
    this.afterBlock();
    this.beforeBlock();
    if (node.definitions) {
      this.chooseChildren(node.definitions);
    }
    this.afterBlock();
  }
  visit(node: DocumentNode | Node) {
    if (node.type == "document") {
      this.document(node);
    } else {
      this.choose(node);
    }
  }
}
