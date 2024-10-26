import { DecoratorNode, LexicalNode, NodeKey } from "lexical";
import { lazy, ReactNode, Suspense } from "react";

const ImageComponent = lazy(() => import("./ImageComponent"));

export class ImageNode extends DecoratorNode<ReactNode> {
  __id: string;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__id, node.__key);
  }

  constructor(id: string, key?: NodeKey) {
    super(key);
    this.__id = id;
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
        <ImageComponent />
      </Suspense>
    );
  }
}

export function $createImageNode(id: string): ImageNode {
  return new ImageNode(id);
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}
