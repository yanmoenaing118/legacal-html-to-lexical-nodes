import {
  DOMConversionMap,
  DOMConversionOutput,
  ElementNode,
  LexicalNode,
} from "lexical";

export class CustomQuoteContainer extends ElementNode {
  static getType(): string {
    return "custom-quote-content";
  }

  static clone(node: CustomQuoteContainer): CustomQuoteContainer {
    return new CustomQuoteContainer(node.__key);
  }

  createDOM(): HTMLElement {
    const dom = document.createElement("figure");
    return dom;
  }

  updateDOM(prevNode: CustomQuoteContainer, dom: HTMLElement): boolean {
    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      p: (node: Node) => ({
        conversion: $convertCustomQuoteContainerElement,
        priority: 0,
      }),
    };
  }
}

export function $createCustomQuoteContainerhNode(): CustomQuoteContainer {
  return new CustomQuoteContainer();
}

export function $isCustomQuoteContainerNode(
  node: LexicalNode | null | undefined
): node is CustomQuoteContainer {
  return node instanceof CustomQuoteContainer;
}

function $convertCustomQuoteContainerElement(
  element: HTMLElement
): DOMConversionOutput {
  console.log("convertCustomQuoteContainerElement ", element);
  const node = $createCustomQuoteContainerhNode();
  return { node };
}
