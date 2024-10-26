import { DecoratorNode, LexicalNode, NodeKey } from "lexical";
import { lazy, ReactNode, Suspense } from "react";

const ImageComponent = lazy(() => import("./ImageComponent"));

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

  createDOM(): HTMLElement {
    return document.createElement("div");
  }

  updateDOM(): false {
    return false;
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
