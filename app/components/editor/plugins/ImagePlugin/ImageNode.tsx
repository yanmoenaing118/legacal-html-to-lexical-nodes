import {
  DecoratorNode,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import { lazy, ReactNode, Suspense } from "react";

const ImageComponent = lazy(() => import("./ImageComponent"));

export type SerializedImageNode = Spread<
  {
    src: string;
    caption: string;
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<ReactNode> {
  __src: string;
  __caption: string;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__caption, node.__key);
  }

  constructor(src: string, caption: string, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__caption = caption;
  }
  isInline(): boolean {
      return false
  }

  createDOM(): HTMLElement {
    const div = document.createElement("div");
    div.style.display = 'contents';
    return div
  }

  updateDOM(): false {
    return false;
  }

  static importJSON(serializedImageNode: SerializedImageNode) {
    const imageNode = new ImageNode(
      serializedImageNode.src,
      serializedImageNode.caption
    );
    return imageNode;
  }

  exportJSON() {
    return {
      type: "image",
      version: 1,
      src: this.__src,
      caption: this.__caption,
    };
  }

  decorate(): ReactNode {
    return (
      <Suspense fallback={null}>
        <ImageComponent src={this.__src} caption={this.__caption} />
      </Suspense>
    );
  }
}

export function $createImageNode({
  src,
  caption,
}: {
  src: string;
  caption: string;
}): ImageNode {
  return new ImageNode(src, caption);
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}
