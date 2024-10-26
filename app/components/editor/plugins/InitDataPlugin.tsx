import { htmlStirng } from "@/data";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef } from "react";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes } from "lexical";

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
      const nodes = $generateNodesFromDOM(editor, dom);

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
