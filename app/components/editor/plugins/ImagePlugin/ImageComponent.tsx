import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  BaseSelection,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
} from "lexical";
import React, { useCallback, useEffect, useState } from "react";
import { $isImageNode } from "./ImageNode";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";

export default function ImageComponent({
  src,
  caption,
  nodeKey,
}: {
  src: string;
  caption: string;
  nodeKey: string;
}) {
  const [show, setShow] = useState(false);
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);
  const [selection, setSelection] = useState<BaseSelection | null>(null);

  const $onDelete = useCallback(
    (payload: KeyboardEvent) => {
      console.log("hi");
      if (isSelected && $isNodeSelection($getSelection())) {
        console.log(`isSelected && $isNodeSelection($getSelection())`);
        const event: KeyboardEvent = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isImageNode(node)) {
          node.remove();
          return true;
        }
      }
      return false;
    },
    [isSelected, nodeKey, editor]
  );

  useEffect(() => {
    let isMounted = true;
    const un = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (isMounted) {
          setSelection(editorState.read(() => $getSelection()));
        }
      }),
    //   editor.registerCommand(
    //     KEY_DELETE_COMMAND,
    //     $onDelete,
    //     COMMAND_PRIORITY_HIGH
    //   ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        $onDelete,
        COMMAND_PRIORITY_LOW
      )
    );
    return () => {
      isMounted = false;
      un();
    };
  }, []);

  return (
    <figure className="relative">
      <img src={src} alt="Fuck" onClick={() => setSelected(true)} />
      <div className="absolute w-full top-0 left-0">
        <button
          className=" w-[30px] h-[30px] rounded-full bg-black text-white  text-lg absolute right-2 top-3"
          type="button"
          onClick={() => setShow(true)}
        >
          i
        </button>
        {show && (
          <div className="bg-black text-white p-2 relative">
            <p>{caption}</p>
            <button
              onClick={() => setShow(false)}
              type="button"
              className="scale-x-125 absolute right-3 top-1"
            >
              x
            </button>
          </div>
        )}
      </div>
    </figure>
  );
}
