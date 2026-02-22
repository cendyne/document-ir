export interface NodeIdentity {
  id?: string;
}

export interface ArrayNode extends NodeIdentity {
  type: "array";
  content: Node[];
}
export interface BadgeNode extends NodeIdentity {
  type: "badge";
  url: string;
  alt: string;
}
export interface BlockNode extends NodeIdentity {
  type: "block";
  content: Node[];
}
export interface BlockQuoteNode extends NodeIdentity {
  type: "block-quote";
  content: Node[];
}
export interface BoldNode extends NodeIdentity {
  type: "bold";
  content: Node[];
}
export interface BreakNode extends NodeIdentity {
  type: "break";
}
export interface BubbleNode extends NodeIdentity {
  type: "bubble";
  orientation: "left" | "right";
  content: Node[];
}
export interface CenterNode extends NodeIdentity {
  type: "center";
  content: Node[];
}
export interface CodeNode extends NodeIdentity {
  type: "code";
  content: Node[];
  language?: string;
  diff?: boolean;
  lineNumbers?: boolean;
}
export interface CodeBlockNode extends NodeIdentity {
  type: "code-block";
  content: CodeNode;
  fileName: string;
  copyable?: boolean;
  collapsable?: boolean;
  collapsed?: boolean;
}
export interface CodeGroupTabNode extends NodeIdentity {
  type: "code-group-tab";
  header: Node[];
  content: CodeNode;
  copyable?: boolean;
}
export interface CodeGroupNode extends NodeIdentity {
  type: "code-group";
  tabs: CodeGroupTabNode[];
}
export interface AccordionTabNode extends NodeIdentity {
  type: "accordion-tab";
  header: Node[];
  content: Node[];
  open?: boolean;
}
export interface AccordionGroupNode extends NodeIdentity {
  type: "accordion-group";
  tabs: AccordionTabNode[];
}
export interface ColumnsNode extends NodeIdentity {
  type: "columns";
  "column-count": 1 | 2 | 3 | 4;
  columns: Node[][];
}
export interface DefinitionNode extends NodeIdentity {
  type: "definition";
  content: Node[];
  title: Node[];
  abbreviation: Node[];
  key: string;
}
export interface DefinitionListNode extends NodeIdentity {
  type: "definition-list";
  content: DefinitionNode[];
}
export interface DefinitionReferenceNode extends NodeIdentity {
  type: "definition-reference";
  definition: {
    abbreviation: Node[];
    key: string;
  };
  content: Node[];
}
export interface EmbedImagePreview {
  url: string;
  blurhash: string;
  width: number;
  height: number;
}
export interface YoutubeEmbed {
  type: "youtube";
  id: string;
  imagePreview?: EmbedImagePreview;
}
export interface EmbedNode extends NodeIdentity {
  type: "embed";
  content: YoutubeEmbed; // more later
}
export interface EmojiNode extends NodeIdentity {
  type: "emoji";
  url: string;
  alt: string;
}
export interface FigureNode extends NodeIdentity {
  type: "figure";
  content: Node[];
}
export interface FigureCaptionNode extends NodeIdentity {
  type: "figure-caption";
  content: Node[];
}
export interface FigureImageNode extends NodeIdentity {
  type: "figure-image";
  content: Node[];
  width?: number;
  height?: number;
  blurhash?: string;
  url: string;
  image?: string;
  alt: string;
  hero?: true;
}
export interface FootnoteNode extends NodeIdentity {
  type: "footnote";
  content: Node[];
}
export interface FootnoteDisplayNode extends NodeIdentity {
  type: "footnote-display";
}
export interface FormattedTextNode extends NodeIdentity {
  type: "formatted-text";
  language?: string;
  text: string;
}
export interface HeaderNode extends NodeIdentity {
  type: "header";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: Node[];
  htmlId?: string;
}
export interface HighTechAlertNode extends NodeIdentity {
  type: "high-tech-alert";
  content: Node[];
  warning: Node[];
}
export interface HorizontalRuleNode extends NodeIdentity {
  type: "horizontal-rule";
}
export interface ImageNode extends NodeIdentity {
  type: "image";
  url: string;
  alt: string;
  width?: number;
  height?: number;
  blurhash?: string;
  image?: string;
  hero?: true;
}
export interface ItalicNode extends NodeIdentity {
  type: "italic";
  content: Node[];
}
export interface LinkNode extends NodeIdentity {
  type: "link";
  content: Node[];
  url: string;
  title?: string;
  target?: "_blank" | "_self" | "_top";
  userGeneratedContent?: true;
  noReferrer?: true;
  noFollow?: true;
  noOpener?: true;
}
export interface ListNode extends NodeIdentity {
  type: "list";
  style: "ordered" | "unordered";
  content: ListItem[];
}
export interface ListItem extends NodeIdentity {
  type: "list-item";
  content: Node[];
}
export interface NoteNode extends NodeIdentity {
  type: "note";
  content: Node[];
}
export interface ParagraphNode extends NodeIdentity {
  type: "paragraph";
  content: Node[];
}
export interface QuoteNode extends NodeIdentity {
  type: "quote";
  name: string;
  icon: string;
  url?: string;
  orientation?: "left" | "right";
  content: Node[];
}
export interface RedactedNode extends NodeIdentity {
  type: "redacted";
  style: "inline" | "block";
  content: Node[];
}
export interface RegionNode extends NodeIdentity {
  type: "region";
  mode: "deny" | "allow";
  content: Node[];
  regions: string;
}
export interface ScriptNode extends NodeIdentity {
  type: "script";
  "mime-type": string;
  source: string;
  url?: string;
}
export interface StyleNode extends NodeIdentity {
  type: "style";
  source?: string;
  url?: string;
}
export type PillColor = "neutral" | "blue" | "green" | "red" | "yellow" | "purple" | "gray" | "teal" | "orange";
export interface PillNode extends NodeIdentity {
  type: "pill";
  color: PillColor;
  content: Node[];
}
export interface SecretNode extends NodeIdentity {
  type: "secret";
  content: Node[];
}
export interface SmallerNode extends NodeIdentity {
  type: "smaller";
  content: Node[];
}
export interface StrikeThroughNode extends NodeIdentity {
  type: "strike-through";
  content: Node[];
}
export interface StickerNode extends NodeIdentity {
  type: "sticker";
  size?: number;
  orientation: "center" | "left" | "right";
  character: string;
  content: Node[];
  name: string;
  width?: number;
  height?: number;
}
export interface TableNode extends NodeIdentity {
  type: "table";
  content: TableCellNode[][];
}
export interface TableCellNode extends NodeIdentity {
  type: "table-cell";
  header?: true;
  span: [number, number];
  content: Node[];
}
export interface TextNode extends NodeIdentity {
  type: "text";
  text: string;
}
export interface UnderlineNode extends NodeIdentity {
  type: "underline";
  content: Node[];
}
export interface VideoNode extends NodeIdentity {
  type: "video";
  poster: string;
  alt: string;
  mp4: string;
  width?: number;
  webm?: string;
  blurhash?: string;
  height?: number;
  muted?: true;
  autoplay?: true;
  loop?: true;
  content?: Node[];
  controls?: true;
}
export interface WarningNode extends NodeIdentity {
  type: "warning";
  content: Node[];
}

export interface TweetNode extends NodeIdentity {
  type: "tweet";
  id: string;
}
export interface TootNode extends NodeIdentity {
  type: "toot";
  id: string;
}
export interface BlueskyNode extends NodeIdentity {
  type: "bluesky";
  id: string;
}
export interface VimeoNode extends NodeIdentity {
  type: "vimeo";
  id: string;
}
export interface YoutubeNode extends NodeIdentity {
  type: "youtube";
  id: string;
}
export type SocialNode = TweetNode | TootNode | BlueskyNode | VimeoNode | YoutubeNode;
export interface CardHeader extends NodeIdentity {
  type: "card-header";
  imageUrl?: string;
  imageBlurhash?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  backgroundBlurhash?: string;
  title: Node[];
  url?: string;
  username?: string;
  usernameDomain?: string;
}
export interface CardMedia extends NodeIdentity {
  type: "card-media";
  content: (ImageNode | VideoNode | EmbedNode)[];
}
export interface CardAttribution extends NodeIdentity {
  type: "card-attribution";
  title?: Node[];
  url?: string;
  date?: string;
  archiveUrl?: string;
}
export interface CardContent extends NodeIdentity {
  type: "card-content";
  content: Node[];
}
export type CardContentNode =
  | CardHeader
  | CardContent
  | CardMedia
  | CardAttribution;
export interface CardNode extends NodeIdentity {
  type: "card";
  header?: CardHeader;
  content?: CardContent;
  media?: CardMedia;
  attribution?: CardAttribution;
  original?: Node;
}
export interface SuperTextNode extends NodeIdentity {
  type: "super";
  content: Node[];
}
export interface SubTextNode extends NodeIdentity {
  type: "sub";
  content: Node[];
}
export interface DateNode extends NodeIdentity {
  type: "date";
  isoDate: string;
  content: Node[];
}
export interface TimeNode extends NodeIdentity {
  type: "time";
  isoTime: string;
  content: Node[];
}
export interface DateTimeNode extends NodeIdentity {
  type: "datetime";
  iso8601: string;
  content: Node[];
}

export interface TimeRangeNode extends NodeIdentity {
  type: "time-range";
  notBefore?: string;
  notAfter?: string;
  content: Node[];
}

export interface StandardNode extends NodeIdentity {
  type: "standard";
  standard: string;
  identifier: string;
  url: string;
  content: Node[];
}

export interface TableOfContentsNode extends NodeIdentity {
  type: "toc";
  date?: DateTimeNode | DateNode | TimeNode;
  href?: string;
  hrefHtmlId?: string;
  content: Node[];
  children: TableOfContentsNode[];
}

export type Node =
  | AccordionGroupNode
  | ArrayNode
  | BadgeNode
  | BlockNode
  | BlockQuoteNode
  | BoldNode
  | BreakNode
  | BubbleNode
  | CardNode
  | CenterNode
  | CodeNode
  | CodeBlockNode
  | CodeGroupNode
  | ColumnsNode
  | DefinitionNode
  | DefinitionListNode
  | DefinitionReferenceNode
  | EmbedNode
  | EmojiNode
  | FigureNode
  | FigureCaptionNode
  | FigureImageNode
  | FootnoteNode
  | FootnoteDisplayNode
  | FormattedTextNode
  | HeaderNode
  | HighTechAlertNode
  | HorizontalRuleNode
  | ImageNode
  | ItalicNode
  | LinkNode
  | ListNode
  | NoteNode
  | ParagraphNode
  | PillNode
  | QuoteNode
  | RedactedNode
  | RegionNode
  | ScriptNode
  | SecretNode
  | StyleNode
  | SmallerNode
  | StickerNode
  | StrikeThroughNode
  | TextNode
  | TableNode
  | SocialNode
  | UnderlineNode
  | VideoNode
  | DateNode
  | TimeNode
  | DateTimeNode
  | SuperTextNode
  | SubTextNode
  | TableOfContentsNode
  | TimeRangeNode
  | StandardNode
  | WarningNode;

export interface DocumentMeta {
  hidden?: boolean;
  noindex?: boolean;
  disableHeadingRequirement?: boolean;
  disableToc?: boolean;
  title: string;
  author?: string;
  description?: string;
  image?: string;
  guid?: string;
  "pub-date"?: number;
  date?: string;
  url: string;
  contentDigest?: string;
  readingDifficultyMultiplier?: number;
  keywords?: string[];
}

export interface DocumentHierarchy {
  headerText: string;
  headerId?: string;
  words: number;
  totalWords: number;
  children: DocumentHierarchy[];
}

export interface DocumentNode extends DocumentMeta {
  type: "document";
  content: Node[];
  definitions?: DefinitionNode[];
  hierarchy?: DocumentHierarchy;
}
