import {
  DOMConversionMap,
  DOMConversionOutput,
  ElementNode,
  LexicalNode,
} from "lexical";

export class CustomQuoteContent extends ElementNode {
  static getType(): string {
    return "custom-quote-content";
  }

  static clone(node: CustomQuoteContent): CustomQuoteContent {
    return new CustomQuoteContent(node.__key);
  }

  createDOM(): HTMLElement {
    const dom = document.createElement("blockquote");
    return dom;
  }

  updateDOM(prevNode: CustomQuoteContent, dom: HTMLElement): boolean {
    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      p: (node: Node) => ({
        conversion: $convertCustomQuoteContentElement,
        priority: 0,
      }),
    };
  }
}

export function $createCustomQuoteContenthNode(): CustomQuoteContent {
  return new CustomQuoteContent();
}

export function $isCustomQuoteContentNode(
  node: LexicalNode | null | undefined
): node is CustomQuoteContent {
  return node instanceof CustomQuoteContent;
}

function $convertCustomQuoteContentElement(
  element: HTMLElement
): DOMConversionOutput {
  console.log("convertCustomQuoteContentElement ", element);
  const node = $createCustomQuoteContenthNode();
  return { node };
}
