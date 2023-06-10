export interface ArrayNode {
  type: "array"
  content: Node[]
}
export interface BlockNode {
  type: "block",
  content: Node[]
}
export interface BlockQuoteNode {
  type: "block-quote"
  content: Node[]
}
export interface BoldNode {
  type: "bold"
  content: Node[]
}
export interface BreakNode {
  type: "break"
}
export interface BubbleNode {
  type: "bubble"
  orientation: "left" | "right"
  content: Node[]
}
export interface CenterNode {
  type: "center"
  content: Node[]
}
export interface CodeNode {
  type: "code"
  content: Node[]
}
export interface ColumnsNode {
  type: "columns"
  "column-count": 1 | 2 | 3 | 4
  columns: Node[][]
}
export interface DefinitionNode {
  type: "definition"
  content: Node[]
  title: Node[]
  abbreviation: Node[]
}
export interface DefinitionListNode {
  type: "definition-list"
  content: DefinitionNode[]
}
export interface DefinitionReferenceNode {
  type: "definition-reference"
  definition: {
    abbreviation: string
  }
  content: Node[]
}
export interface EmojiNode {
  type: "emoji"
  url: string
  alt: string
}
export interface FigureNode {
  type: "figure"
  content: Node[]
}
export interface FigureCaptionNode {
  type: "figure-caption"
  content: Node[]
}
export interface FigureImageNode {
  type: "figure-image"
  content: Node[]
  width: number
  height: number
  blurhash?: string
  url: string
  image?: string
  alt: string
  hero?: true
}
export interface FormattedTextNode {
  type: "formatted-text"
  language?: string
  text: string
}
export interface HeaderNode {
  type: "header"
  level: 1 | 2 | 3 | 4 | 5 | 6
  content: Node[]
}
export interface HighTechAlertNode {
  type: "high-tech-alert"
  content: Node[]
  warning: Node[]
}
export interface HorizontalRuleNode {
  type: "horizontal-rule"
}
export interface ImageNode {
  type: "image"
  url: string
  alt: string
  width?: number
  height?: number
  blurhash?: string
  image?: string
  hero?: true
}
export interface ItalicNode {
  type: "italic"
  content: Node[]
}
export interface LinkNode {
  type: "link"
  content: Node[],
  url: string,
  title?: string,
  target?: '_blank' | '_self' | '_top'
  userGeneratedContent?: true
  noReferrer?: true
  noFollow?: true
  noOpener?: true
}
export interface ListNode {
  type: "list"
  style: "ordered" | "unordered"
  content: ListItem[]
}
export interface ListItem {
  type: "list-item"
  content: Node[]
}
export interface NoteNode {
  type: "note"
  content: Node[]
}
export interface ParagraphNode {
  type: "paragraph"
  content: Node[]
}
export interface QuoteNode {
  type: "quote"
  name: string
  icon: string
  url?: string
  content: Node[]
}
export interface RedactedNode {
  type: "redacted"
  style: "inline" | "block"
  content: Node[]
}
export interface RegionNode {
  type: "region"
  mode: "deny" | "allow"
  content: Node[]
  regions: string
}
export interface ScriptNode {
  type: "script"
  "mime-type": string
  source: string
}
export interface SecretNode {
  type: "secret"
  content: Node[]
}
export interface SmallerNode {
  type: "smaller"
  content: Node[]
}
export interface StrikeThroughNode {
  type: "strike-through"
  content: Node[]
}
export interface StickerNode {
  type: "sticker"
  size: number
  orientation: "center" | "left" | "right"
  character: string
  content: Node[]
  name: string
}
export interface TableNode {
  type: "table"
  content: TableCellNode[][]
}
export interface TableCellNode {
  type: "table-cell"
  header?: true
  span: [number, number]
  content: Node[]
}
export interface TextNode {
  type: "text"
  text: string
}
export interface UnderlineNode {
  type: "underline"
  content: Node[]
}
export interface VideoNode {
  type: "video"
  poster: string
  alt: string
  mp4: string
  width?: number
  webm?: string
  blurhash?: string
  height?: number
  muted?: true
  autoplay?: true
  loop?: true
  content?: Node[]
}
export interface WarningNode {
  type: "warning"
  content: Node[]
}

export interface TweetNode {
  type: "tweet"
  id: string
}
export interface TootNode {
  type: "toot"
  id: string
}
export interface VimeoNode {
  type: "vimeo"
  id: string
}
export interface YoutubeNode {
  type: "youtube"
  id: string
}
export type SocialNode = TweetNode | TootNode | VimeoNode | YoutubeNode
export interface CardHeader {
  type: 'card-header'
  imageUrl?: string
  backgroundImage?: string
  backgroundColor?: string
  backgroundBlurhash?: string
  title: Node[]
  url?: string
  username?: string
  usernameDomain?: string
}
export interface CardMedia {
  type: 'card-media'
  content: (ImageNode | VideoNode)[]
}
export interface CardAttribution {
  type: 'card-attribution'
  title?: Node[]
  url?: string
  date?: string
  archiveUrl?: string
}
export interface CardContent {
  type: 'card-content'
  content: Node[]
}
export type CardContentNode = CardHeader | CardContent | CardMedia | CardAttribution
export interface CardNode {
  type: 'card'
  header?: CardHeader
  content?: CardContent
  media?: CardMedia
  attribution?: CardAttribution
}

export type Node = ArrayNode | BlockNode | BlockQuoteNode | BoldNode | BreakNode | BubbleNode | CardNode | CenterNode | CodeNode | ColumnsNode | DefinitionNode | DefinitionListNode | DefinitionReferenceNode | EmojiNode | FigureNode | FigureCaptionNode | FigureImageNode | FormattedTextNode | HeaderNode | HighTechAlertNode | HorizontalRuleNode | ImageNode | ItalicNode | LinkNode | ListNode | NoteNode | ParagraphNode | QuoteNode | RedactedNode | RegionNode | ScriptNode | SecretNode | SmallerNode | StickerNode | StrikeThroughNode | TextNode | TableNode | SocialNode | UnderlineNode | VideoNode | WarningNode

export interface DocumentNode {
  type: "document"
  hidden?: boolean
  noindex?: boolean
  title: string
  author: string
  description?: string
  image?: string
  content: Node[]
  guid?: string
  "pub-date"?: number
  date?: string
  url: string
}