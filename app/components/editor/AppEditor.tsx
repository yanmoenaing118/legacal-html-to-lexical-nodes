"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import EditorOnChangePlugin from "./plugins/EditorOnChangePlugin";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import { CollapsibleContainerNode } from "./plugins/CollapsiblePlugin/CollapsibleContainerNode";
import { CollapsibleTitleNode } from "./plugins/CollapsiblePlugin/CollabsibleTitleNode";
import { CollapsibleContentNode } from "./plugins/CollapsiblePlugin/CollapsibleContentNode";




export default function AppEditor() {
  const config: InitialConfigType = {
    namespace: "AppEditor",
    nodes: [CollapsibleContainerNode, CollapsibleTitleNode, CollapsibleContentNode],
    onError: (err) => {
      console.log(err);
    },
  };

  return (
    <div className="AppEditor max-w-xl mx-auto">
      <LexicalComposer initialConfig={config}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="ContentEditable min-h-96 text-xl" />
          }
          placeholder={<div>Placeholder</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <EditorOnChangePlugin  />
        <CollapsiblePlugin />
      </LexicalComposer>
    </div>
  );
}
