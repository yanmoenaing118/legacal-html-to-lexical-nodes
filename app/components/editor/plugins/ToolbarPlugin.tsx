import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { createCommand, LexicalCommand, COMMAND_PRIORITY_LOW } from "lexical";
import React from "react";
import { INSERT_COLLAPSIBLE_COMMAND } from "./CollapsiblePlugin";

export const HELLO_COMMAND: LexicalCommand<string> =
  createCommand("HELLO_COMMAND");

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="ToolbarPlugin py-3 flex gap-2">

      <button className="border shadow-lg p-1" onClick={()=> editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined)}>
        COLLAPSIBLE
      </button>
    </div>
  );
}
