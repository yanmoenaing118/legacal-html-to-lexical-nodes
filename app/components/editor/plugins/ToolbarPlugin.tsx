import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { createCommand, LexicalCommand, COMMAND_PRIORITY_LOW } from "lexical";
import React, { useEffect } from "react";
import { INSERT_COLLAPSIBLE_COMMAND } from "./CollapsiblePlugin";

export const HELLO_COMMAND: LexicalCommand<string> =
  createCommand("HELLO_COMMAND");

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="ToolbarPlugin">
      <button onClick={() => editor.dispatchCommand(HELLO_COMMAND, "HI")}>
        Add Component
      </button>
      <button className="border shadow-lg p-3" onClick={()=> editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined)}>
        INSERT_COLLAPSIBLE_COMMAND
      </button>
    </div>
  );
}
