import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";
import { useCallback } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";

export default function EditorOnChangePlugin() {
  const [editor] = useLexicalComposerContext();

  const handleEditorOnChange = useCallback(
    (v: EditorState) => {
      v.read(() => {
        const html = $generateHtmlFromNodes(editor);
        // console.log(html);
      });
    },
    [editor]
  );

  return <OnChangePlugin onChange={handleEditorOnChange} />;
}
