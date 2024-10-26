import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import { useEffect } from "react";
import { $createImageNode, ImageNode } from "./ImageNode";

export const INSERT_IMAGE_COMMAND: LexicalCommand<unknown> = createCommand(
  "INSERT_IMAGE_COMMAND"
);

export default function ImagePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }
    return mergeRegister(
      editor.registerCommand(
        INSERT_IMAGE_COMMAND,
        () => {
          editor.update(() => {
            const imageNode = $createImageNode({
              src: "https://pics.dmm.co.jp/digital/video/1stars984/1stars984jp-5.jpg",
              caption: "Pretty Yano Ema",
            });
            $insertNodes([imageNode]);
          });

          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [editor]);
  return null;
}
