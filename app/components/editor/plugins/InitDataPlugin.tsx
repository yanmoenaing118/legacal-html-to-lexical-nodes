import { htmlStirng } from "@/data";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef } from "react";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";

import {
  $createParagraphNode,
  $createTextNode,
  EditorState,
  LexicalEditor,
  $getRoot,
  $insertNodes,
  LexicalNode,
} from "lexical";

import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";

function customGenerateNodesFromDOM(
  editor: LexicalEditor,
  dom: HTMLElement
): (LexicalNode | null)[] {
  const nodes: (LexicalNode | null)[] = [];

  dom.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;

      switch (element.tagName) {
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6": {
          const headingNode = $createHeadingNode(
            element.tagName.toLowerCase() as HeadingTagType
          );
          headingNode.append($createTextNode(element.textContent || ""));
          nodes.push(headingNode);
          break;
        }
        case "P": {
          const paragraphNode = $createParagraphNode();
          paragraphNode.append($createTextNode(element.textContent || ""));
          nodes.push(paragraphNode);
          break;
        }
        default: {
          // Fallback to paragraph for any unhandled tags
          const paragraphNode = $createParagraphNode();
          paragraphNode.append($createTextNode(element.textContent || ""));
          nodes.push(paragraphNode);
          break;
        }
      }
    }
  });

  return nodes;
}

export default function InitDataPlugin() {
  const ref = useRef(false);
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (ref.current) {
      return;
    }
    ref.current = true;
    editor.update(() => {
      // In the browser you can use the native DOMParser API to parse the HTML string.
      const parser = new DOMParser();
      const dom = parser.parseFromString(htmlStirng, "text/html");

      // Once you have the DOM instance it's easy to generate LexicalNodes.
      console.log(dom);
      // const nodes = $generateNodesFromDOM(editor, dom);
      const nodes = customGenerateNodesFromDOM(editor, dom.body).filter(
        (node) => !!node
      );

      console.log(nodes);

      const root = $getRoot();

      root.clear();
      // Select the root
      $getRoot().select();

      // Insert them at a selection.
      $insertNodes(nodes);
    });
  }, []);
  return null;
}
