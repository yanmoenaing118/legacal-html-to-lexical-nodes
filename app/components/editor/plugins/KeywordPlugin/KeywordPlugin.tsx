import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $getRoot, $createTextNode, $isTextNode } from "lexical";
import { $createHighlightNode } from "../../nodes/KeywordNode/KeywordNode";

function HighlightPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const textNodes: any = [];

        root.getChildren().forEach((node) => {
          if ($isTextNode(node)) {
            textNodes.push(node);
          }
        });

        editor.update(() => {
          textNodes.forEach((textNode: any) => {
            const textContent = textNode.getTextContent();
            const commandRegex = /\/[a-zA-Z0-9-_]+/g;
            let match;

            while ((match = commandRegex.exec(textContent)) !== null) {
              const matchedText = match[0];
              const startIndex = match.index;
              const endIndex = startIndex + matchedText.length;

              // Split the text node
              const beforeText = textContent.slice(0, startIndex);
              const afterText = textContent.slice(endIndex);

              if (beforeText) {
                textNode.replace($createTextNode(beforeText));
              }

              const highlightNode = $createHighlightNode(matchedText);
              textNode.insertAfter(highlightNode);

              console.log('hi')
              if (afterText) {
                highlightNode.insertAfter($createTextNode(afterText));
              }
            }
          });
        });
      });
    });
  }, [editor]);

  return null;
}

export default HighlightPlugin;
