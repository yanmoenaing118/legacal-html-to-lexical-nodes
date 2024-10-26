import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, $insertNodes, EditorState } from "lexical";
import { useCallback, useEffect } from "react";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { htmlStirng } from "@/data";
import { memo } from "react";

function EditorOnChangePlugin() {
  const [editor] = useLexicalComposerContext();

  const handleEditorOnChange = useCallback(
    (v: EditorState) => {
      v.read(() => {
        const html = $generateHtmlFromNodes(editor);
        // console.log(html);
        const json = editor.getEditorState().toJSON();
        console.log(json);
      });
    },
    [editor]
  );

  return <OnChangePlugin onChange={handleEditorOnChange} />;
}

export default memo(EditorOnChangePlugin);
