"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import TestPlugin from "./plugins/TestPlugin/TestPlugin";
import { HighlightNode } from "./nodes/KeywordNode/KeywordNode";
import KeywordsPlugin from "./plugins/KeywordPlugin/KeywordPlugin";


export default function AppEditor() {
  const config: InitialConfigType = {
    namespace: "AppEditor",
    nodes: [
      HighlightNode
    ],
    onError: (err) => {
      console.log(err);
    },

  };

  return (
    <div className="max-w-3xl mx-auto mb-96 relative mt-10">
      <LexicalComposer initialConfig={config}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="ContentEditable min-h-96 text-base  ring-0 focus:ring-0 focus-within:ring-0 focus:outline-none z-[999] relative" />
          }
          placeholder={<p className="absolute top-0 left-0 text-base text-gray-500 z-[100]">Write something or press '/' for commands ...</p>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <TestPlugin />
        <KeywordsPlugin />
      </LexicalComposer>
    </div>
  );
}
