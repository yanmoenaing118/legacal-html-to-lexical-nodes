import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  LexicalEditor,
  RangeSelection,
  TextNode,
} from "lexical";
export const PUNCTUATION =
  "\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%'\"~=<>_:;";
function getTextUpToAnchor(selection: RangeSelection): string | null {
  const anchor = selection.anchor;
  if (anchor.type !== "text") {
    return null;
  }
  const anchorNode = anchor.getNode();
  if (!anchorNode.isSimpleText()) {
    return null;
  }
  const anchorOffset = anchor.offset;
  return anchorNode.getTextContent().slice(0, anchorOffset);
}

function getQueryTextForSearch(editor: LexicalEditor): string | null {
  let text = null;
  editor.getEditorState().read(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
      return;
    }
    text = getTextUpToAnchor(selection);
  });
  return text;
}

function isSelectionOnEntityBoundary(editor: LexicalEditor, offset: number) {
//   if (offset !== 0) {
//     return false;
//   }
  return editor.getEditorState().read(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchor = selection.anchor;
      const anchorNode = anchor.getNode();
      const prevSibling = anchorNode.getPreviousSibling();
      console.log('anchorNode', anchorNode);
      console.log('previousSlibling', prevSibling);
      return $isTextNode(prevSibling) && prevSibling.isTextEntity();
    }
  });
}

export default function TestPlugin() {

    const [editor] = useLexicalComposerContext();



    useEffect(() => {
      editor.registerNodeTransform(TextNode, node => {
          if(node.getTextContent() === "bold" && !node.hasFormat("bold")) {
              node.setFormat("bold");
          }
      })

      const updateListener = () => {
        editor.getEditorState().read(() => {
        const editorWindow = editor._window || window;
          const text = getQueryTextForSearch(editor);
          const range = editorWindow.document.createRange();

          const validChars = "[^" + "/" + PUNCTUATION + "\\s]";
          const TypeaheadTriggerRegex = new RegExp(
            "(^|\\s|\\()(" +
              "[" +
              "/" +
              "]" +
              "((?:" +
              validChars +
              "){0," +
              20 +
              "})" +
              ")$"
          );
          const match = TypeaheadTriggerRegex.exec(text || "");
          if (match !== null) {
            const maybeLeadingWhitespace = match[1];
            const matchingString = match[3];
            const textInfo = {
              leadOffset: match.index + maybeLeadingWhitespace.length,
              matchingString,
              replaceableString: match[2],
            };
            // console.log("match info", textInfo);
            // isSelectionOnEntityBoundary(editor, textInfo.leadOffset);

            // const rangeRect = range.getBoundingClientRect();
            // console.log(rangeRect);

          }
          return null;
        });
      };

      const removeUpdateListener =
        editor.registerUpdateListener(updateListener);
      return () => {
        removeUpdateListener();
      };
    }, [editor]);

  return null;
}
