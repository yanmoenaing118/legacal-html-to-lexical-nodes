import { TextNode } from "lexical";

export class HighlightNode extends TextNode {
  static getType() {
    return "highlight";
  }

  static clone(node: any) {
    return new HighlightNode(node.__text, node.__key);
  }

  createDOM(config: any) {
    const dom = document.createElement("span");
    dom.style.backgroundColor = "yellow";
    dom.style.color = "black";
    dom.style.fontWeight = "bold";
    dom.style.padding = "2px 4px";
    dom.style.borderRadius = "4px";
    return dom;
  }

  updateDOM(prevNode: any, dom: any) {
    return false;
  }
}

export function $createHighlightNode(text: any) {
  return new HighlightNode(text);
}

export function $isHighlightNode(node: any) {
  return node instanceof HighlightNode;
}
