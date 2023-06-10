import { BlockQuoteNode, BoldNode, BreakNode, BubbleNode, CenterNode, CodeNode, ColumnsNode, DefinitionListNode, DefinitionNode, DefinitionReferenceNode, DocumentNode, FigureCaptionNode, FigureImageNode, FigureNode, FormattedTextNode, HeaderNode, HighTechAlertNode, HorizontalRuleNode, ImageNode, ItalicNode, LinkNode, ListItem, ListNode, NoteNode, ParagraphNode, QuoteNode, RedactedNode, RegionNode, ScriptNode, SecretNode, SmallerNode, SocialNode, StickerNode, StrikeThroughNode, TableCellNode, TableNode, TextNode, UnderlineNode, WarningNode, Node, ArrayNode, VideoNode, CardNode, CardContent, CardMedia, EmojiNode } from './types';

export class IdentityTransformer {
  protected async beforeBlock() : Promise<void> {

  }
  protected async afterBlock() : Promise<void> {

  }
  protected async beforeInline() : Promise<void> {

  }
  protected async afterInline() : Promise<void> {

  }
  protected async chooseChildren(nodes: Node[]): Promise<Node[]> {
    const children : Node[] = [];
    for (let child of nodes) {
      const resultNode = await this.choose(child);
      if (resultNode) {
        children.push(resultNode);
      }
    }
    return children;
  }
  protected async blockQuote(node: BlockQuoteNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "block-quote",
      content
    };
  }
  protected async bold(node: BoldNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    return {
      type: "bold",
      content
    };
  }
  protected async break_(node: BreakNode): Promise<Node | null> {
    await this.beforeBlock();
    await this.afterBlock();
    return {
      type: "break"
    }
  }
  protected async bubble(node: BubbleNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "bubble",
      orientation: node.orientation || 'left',
      content
    }
  }
  protected async center(node: CenterNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "center",
      content
    }
  }
  protected async code(node: CodeNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    return {
      type: "code",
      content
    }
  }
  protected async columns(node: ColumnsNode): Promise<Node | null> {
    let columns: Node[][] = [];
    for (let column of node.columns) {
      await this.beforeBlock();
      columns.push(await this.chooseChildren(column));
      await this.afterBlock();
    }

    return {
      type: "columns",
      columns,
      "column-count": node['column-count']
    }
  }
  protected async definition(node: DefinitionNode): Promise<DefinitionNode | null> {
    await this.beforeBlock();
    const abbreviation = await this.chooseChildren(node.abbreviation);
    await this.afterBlock();
    await this.beforeBlock();
    const title = await this.chooseChildren(node.title);
    await this.afterBlock();
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "definition",
      abbreviation,
      title,
      content,
    }
  }
  protected async definitionList(node: DefinitionListNode): Promise<Node | null> {
    await this.beforeBlock();
    const children : DefinitionNode[] = [];
    for (let child of node.content) {
      const resultNode = await this.definition(child);
      if (resultNode) {
        children.push(resultNode);
      }
    }
    await this.afterBlock();
    return {
      type: "definition-list",
      content: children
    }
  }
  protected async definitionReference(node: DefinitionReferenceNode): Promise<Node | null> {
    return {
      type: "definition-reference",
      definition: {
        abbreviation: node.definition.abbreviation
      },
      content: await this.chooseChildren(node.content)
    }
  }
  protected async emoji(node: EmojiNode): Promise<Node | null> {
    return {
      type: 'emoji',
      url: node.url,
      alt: node.alt
    }
  }
  protected async figure(node: FigureNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "figure",
      content
    }
  }
  protected async figureCaption(node: FigureCaptionNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "figure-caption",
      content
    }
  }
  protected async figureImage(node: FigureImageNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "figure-image",
      alt: node.alt || '',
      blurhash: node.blurhash || '',
      height: node.height,
      width: node.width,
      image: node.image,
      url: node.url,
      content,
      hero: node.hero
    }
  }
  protected async formattedText(node: FormattedTextNode): Promise<Node | null> {
    await this.beforeBlock();
    await this.afterBlock();
    return {
      type: "formatted-text",
      text: node.text || '',
      language: node.language
    }
  }
  protected async header(node: HeaderNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "header",
      content,
      level: node.level || 2
    }
  }
  protected async highTechAlert(node: HighTechAlertNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    await this.beforeBlock();
    const warning = await this.chooseChildren(node.warning);
    await this.afterBlock();
    return {
      type: "high-tech-alert",
      content,
      warning
    }
  }
  protected async horizontalRule(node: HorizontalRuleNode): Promise<Node | null> {
    await this.beforeBlock();
    await this.afterBlock();
    return {
      type: "horizontal-rule"
    }
  }
  protected async image(node: ImageNode): Promise<Node | null> {
    await this.beforeBlock();
    await this.afterBlock();
    return {
      type: "image",
      alt: node.alt || '',
      blurhash: node.blurhash || '',
      height: node.height,
      width: node.width,
      image: node.image,
      url: node.url,
      hero: node.hero
    }
  }
  protected async italic(node: ItalicNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    return {
      type: "italic",
      content
    }
  }
  protected async link(node: LinkNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    return {
      type: "link",
      content,
      url: node.url,
      title: node.title
    }
  }
  protected async array(node: ArrayNode): Promise<Node | null> {
    return {
      type: "array",
      content: await this.chooseChildren(node.content),
    }
  }
  protected async note(node: NoteNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "note",
      content,
    }
  }
  protected async list(node: ListNode): Promise<Node | null> {
    let content : ListItem[] = [];
    for (let item of node.content) {
      await this.beforeBlock();
      const children = await this.chooseChildren(item.content);
      await this.afterBlock();
      if (children && children.length > 0) {
        content.push({
          type: 'list-item',
          content: children
        })
      }
    }
    return {
      type: "list",
      style: node.style || 'unordered',
      content,
    }
  }
  protected async paragraph(node: ParagraphNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "paragraph",
      content,
    }
  }
  protected async quote(node: QuoteNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "quote",
      icon: node.icon,
      name: node.name,
      content,
      url: node.url,
    }
  }
  protected async redacted(node: RedactedNode): Promise<Node | null> {
    if (node.style == 'block') {
      await this.beforeBlock();
    } else {
      await this.beforeInline();
    }
    const content = await this.chooseChildren(node.content);
    if (node.style == 'block') {
      await this.afterBlock();
    } else {
      await this.afterInline();
    }
    return {
      type: "redacted",
      style: node.style,
      content,
    }
  }
  protected async region(node: RegionNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "region",
      mode: node.mode,
      regions: node.regions,
      content,
    }
  }
  protected async script(node: ScriptNode): Promise<Node | null> {
    return {
      type: "script",
      "mime-type": node['mime-type'] || 'text/javascript',
      source: node.source
    }
  }
  protected async secret(node: SecretNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    return {
      type: "secret",
      content,
    }
  }
  protected async smaller(node: SmallerNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    return {
      type: "smaller",
      content,
    }
  }
  protected async sticker(node: StickerNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "sticker",
      orientation: node.orientation,
      character: node.character,
      name: node.name,
      size: node.size,
      content
    }
  }
  protected async strikeThrough(node: StrikeThroughNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    return {
      type: "strike-through",
      content,
    }
  }
  protected async text(node: TextNode): Promise<Node | null> {
    return {
      type: "text",
      text: node.text,
    }
  }
  protected async table(node: TableNode): Promise<Node | null> {
    let content : TableCellNode[][] = [];
    for (let row of node.content) {
      let cells: TableCellNode[] = [];
      let emptyCount = 0;
      for (let cell of row) {
          await this.beforeBlock();
          let children = await this.chooseChildren(cell.content)
          await this.afterBlock();
          if (children && children.length == 0) {
            emptyCount++;
          }
          cells.push({
            type: 'table-cell',
            header: cell.header,
            span: [cell.span[0] || 1, cell.span[1] || 1],
            content: children,
          })
      }
      if (cells.length > 0 && emptyCount != cells.length) {
        content.push(cells);
      }
    }
    return {
      type: "table",
      content
    }
  }
  protected async social(node: SocialNode): Promise<Node | null> {
    await this.beforeBlock();
    await this.afterBlock();
    return {
      type: node.type,
      id: node.id,
    }
  }
  protected async underline(node: UnderlineNode): Promise<Node | null> {
    await this.beforeInline();
    const content = await this.chooseChildren(node.content);
    await this.afterInline();
    return {
      type: "underline",
      content,
    }
  }
  protected async video(node: VideoNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = node.content && await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "video",
      alt: node.alt,
      blurhash: node.blurhash,
      mp4: node.mp4,
      poster: node.poster,
      autoplay: node.autoplay,
      content,
      height: node.height,
      loop: node.loop,
      muted: node.muted,
      webm: node.webm,
      width: node.width
    }
  }
  protected async warning(node: WarningNode): Promise<Node | null> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    return {
      type: "warning",
      content,
    }
  }
  protected async card(node: CardNode): Promise<Node | null> {
    let content : CardContent | undefined;
    if (node.content) {
      await this.beforeBlock();
      const cardContent = await this.chooseChildren(node.content.content);
      if (cardContent && cardContent.length > 0) {
        content = {
          type: 'card-content',
          content: cardContent
        }
      }
      await this.afterBlock();
    }
    const attribution = node.attribution;
    const header = node.header;
    let media : CardMedia | undefined;
    if (node.media) {
      let mediaContent : (VideoNode | ImageNode)[] = []
      for (let mediaNode of node.media.content) {
        await this.beforeBlock();
        const transformedNode = await this.choose(mediaNode);
        if (transformedNode) {
          if (transformedNode.type == 'image' || transformedNode.type == 'video') {
            mediaContent.push(transformedNode);
          }
        }
        await this.afterBlock();
      }
      if (mediaContent.length > 0) {
        media = {
          type: 'card-media',
          content: mediaContent
        }
      }
    }

    return {
      type: 'card',
      content,
      attribution,
      header,
      media
    }
  }
  protected async choose(node: Node): Promise<Node | null> {
    if (!node || !node.type) {
      throw new Error(`Unexpected node, no type: ${JSON.stringify(node)}`);
    }
    try {
      switch (node.type) {
        case 'block-quote': return await this.blockQuote(node);
        case 'bold': return await this.bold(node);
        case 'break': return await this.break_(node);
        case 'bubble': return await this.bubble(node);
        case 'card': return await this.card(node);
        case 'center': return await this.center(node);
        case 'code': return await this.code(node);
        case 'columns': return await this.columns(node);
        case 'definition': return await this.definition(node);
        case 'definition-list': return await this.definitionList(node);
        case 'definition-reference': return await this.definitionReference(node);
        case 'emoji': return await this.emoji(node);
        case 'figure': return await this.figure(node);
        case 'figure-caption': return await this.figureCaption(node);
        case 'figure-image': return await this.figureImage(node);
        case 'formatted-text': return await this.formattedText(node);
        case 'header': return await this.header(node);
        case 'high-tech-alert': return await this.highTechAlert(node);
        case 'horizontal-rule': return await this.horizontalRule(node);
        case 'image': return await this.image(node);
        case 'italic': return await this.italic(node);
        case 'link': return await this.link(node);
        case 'array': return await this.array(node);
        case 'note': return await this.note(node);
        case 'list': return await this.list(node);
        case 'paragraph': return await this.paragraph(node);
        case 'quote': return await this.quote(node);
        case 'redacted': return await this.redacted(node);
        case 'region': return await this.region(node);
        case 'script': return await this.script(node);
        case 'secret': return await this.secret(node);
        case 'smaller': return await this.smaller(node);
        case 'sticker': return await this.sticker(node);
        case 'strike-through': return await this.strikeThrough(node);
        case 'table': return await this.table(node);
        case 'text': return await this.text(node);
        case 'toot':
        case 'tweet':
        case 'vimeo':
        case 'youtube':
          return await this.social(node);
        case 'underline': return await this.underline(node);
        case 'video': return await this.video(node);
        case 'warning': return await this.warning(node);
      }
    } catch (e) {
      console.log(`Got exception while processing node: ${JSON.stringify(node)}`);
      throw e;
    }
    //@ts-ignore
    console.error(`Unsupported type ${node.type}`)
    return null;
  }
  protected async document(node: DocumentNode): Promise<DocumentNode> {
    await this.beforeBlock();
    const content = await this.chooseChildren(node.content);
    await this.afterBlock();
    const result : DocumentNode = {
      type: "document",
      title: node.title,
      author: node.author,
      content,
      hidden: node.hidden,
      noindex: node.noindex,
      description: node.description,
      image: node.image,
      guid: node.guid,
      "pub-date": node['pub-date'],
      date: node.date,
      url: node.url,
    }
    return result;
  }
  async transform(node: DocumentNode): Promise<DocumentNode> {
    return await this.document(node);
  }
}