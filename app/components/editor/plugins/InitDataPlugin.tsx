import { htmlStirng } from "@/data";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef } from "react";

import {
  $createParagraphNode,
  $createTextNode,
  EditorState,
  LexicalEditor,
  $getRoot,
  $insertNodes,
  LexicalNode,
} from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";
import {
  $createHeadingNode,
  HeadingTagType,
  $createQuoteNode,
} from "@lexical/rich-text";
import { $createListNode, $createListItemNode, ListType } from "@lexical/list";
import { $createLinkNode } from "@lexical/link";
import { $createCustomQuoteContainerhNode } from "./CustomQuote/CustomQuoteContainer";
import { $createImageNode } from "./ImagePlugin/ImageNode";

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
          element.childNodes.forEach((childNode) => {
            const childEl = childNode as HTMLElement;
            if (childEl.tagName === "A") {
              const href = childEl.getAttribute("href") || "#";
              const linkNode = $createLinkNode(href);
              linkNode.append($createTextNode(childEl.textContent || ""));
              paragraphNode.append(linkNode);
            } else {
              paragraphNode.append(
                $createTextNode((childEl as HTMLElement).textContent || "")
              );
            }
          });

          // paragraphNode.append($createTextNode(element.textContent || ""));
          nodes.push(paragraphNode);
          break;
        }
        case "A": {
          const href = element.getAttribute("href") || "#";
          const linkNode = $createLinkNode(href);
          linkNode.append($createTextNode(element.textContent || ""));
          nodes.push(linkNode);
          break;
        }
        case "UL":
        case "OL": {
          const listNode = $createListNode(
            element.tagName.toLowerCase() as ListType
          );
          element.childNodes.forEach((childNode) => {
            if (
              childNode.nodeType === Node.ELEMENT_NODE &&
              (childNode as HTMLElement).tagName === "LI"
            ) {
              const listItemNode = $createListItemNode();

              childNode.childNodes.forEach((node) => {
                const childEl = node as HTMLElement;
                if (childEl.tagName === "A") {
                  const href = childEl.getAttribute("href") || "#";
                  const linkNode = $createLinkNode(href);
                  linkNode.append($createTextNode(childEl.textContent || ""));
                  listItemNode.append(linkNode);
                } else {
                  listItemNode.append(
                    $createTextNode((node as HTMLElement).textContent || "")
                  );
                }
              });

              listNode.append(listItemNode);
            }
          });
          nodes.push(listNode);
          break;
        }
        case "FIGURE":
          // console.log("figure", element);
          if (element.classList.contains("quote")) {
            const customQuotecontainer = $createCustomQuoteContainerhNode();
            element.childNodes.forEach((node) => {
              const childEl = node as HTMLElement;
              if (childEl.tagName === "BLOCKQUOTE") {
                // console.log('hi from ', childEl)
                const quote = $createQuoteNode();
                quote.append($createTextNode(childEl.textContent || ""));
                customQuotecontainer.append(quote);
              }
            });
            nodes.push(customQuotecontainer);
            return;
          } else if (element.classList.contains("image")) {
            const imgSrc = (element.querySelector("img") as HTMLImageElement)
              .src;
            const imageCaption = element.querySelector("figcaption");
            const text =
              imageCaption && imageCaption.textContent
                ? imageCaption.textContent
                : "";

            const imageNode = $createImageNode({
              src: imgSrc,
              caption: text,
            });
            nodes.push(imageNode);
            return;
          }
          break;
        default: {
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
      // $insertNodes(nodes);
      nodes.forEach((node) => $insertNodes([node]));
    });
  }, []);
  return null;
}
