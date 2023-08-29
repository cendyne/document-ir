import { DocumentThinningTransformer } from "./DocumentThinningTransformer.ts";
import { WordCounterVisitor } from "./WordCounterVisitor.ts";
import { IdentityTransformer, TextVisitor } from "./index.ts";
import { DocumentHierarchy, DocumentNode, Node } from "./types.ts";

interface Hierarchy {
  header: string;
  headerId?: string;
  depth: number;
  nodes: Node[];
  children: Hierarchy[];
}

function convertHierarchy(parent: Hierarchy): DocumentHierarchy {
  const docHierarchy: DocumentHierarchy = {
    headerText: parent.header,
    headerId: parent.headerId,
    words: 0,
    totalWords: 0,
    children: [],
  };
  const visitor = new WordCounterVisitor();
  for (const node of parent.nodes) {
    visitor.visit(node);
  }

  docHierarchy.words = visitor.getCount();
  docHierarchy.totalWords = docHierarchy.words;

  for (const child of parent.children) {
    const childHierarchy = convertHierarchy(child);
    docHierarchy.children.push(childHierarchy);
    docHierarchy.totalWords += childHierarchy.totalWords;
  }

  return docHierarchy;
}

export class WordCounterTransformer extends IdentityTransformer {
  constructor() {
    super();
  }

  async transform(node: DocumentNode): Promise<DocumentNode> {
    // Isolate it
    const jsonNode = JSON.parse(JSON.stringify(node));
    const thinned = await new DocumentThinningTransformer().transform(jsonNode);

    const stack: Hierarchy[] = [];
    const root: Hierarchy = {
      header: node.title,
      headerId: "title",
      nodes: [],
      children: [],
      depth: 1,
    };
    stack.push(root);
    let depth = 1;

    for (const node of thinned.content) {
      if (node.type == "header") {
        if (node.level == 1) {
          // never pop the root
          continue;
        } else if (node.level <= depth) {
          for (let i = stack.length - 1; i > 0; i--) {
            if (stack[i].depth >= node.level) {
              stack.pop();
            }
          }
        }
        const visitor = new TextVisitor();
        visitor.visit(node);
        const h: Hierarchy = {
          header: visitor.getText(),
          depth: node.level,
          children: [],
          nodes: [],
        };
        if (node.htmlId) {
          h.headerId = node.htmlId;
        }
        stack[stack.length - 1].children.push(h);
        stack.push(h);
        depth = node.level;
      } else {
        stack[stack.length - 1].nodes.push(node);
      }
    }

    // The transformer does not actually walk through the document tree
    // We just append a newly calculated hierarchy object
    const doc = {
      ...node,
    };

    doc.hierarchy = convertHierarchy(root);

    return doc;
  }
}
