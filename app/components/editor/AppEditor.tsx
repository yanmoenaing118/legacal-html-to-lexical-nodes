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
import { CollapsibleContainerNode } from "./plugins/CollapsiblePlugin/CollapsibleContainerNode";
import { CollapsibleTitleNode } from "./plugins/CollapsiblePlugin/CollabsibleTitleNode";
import { CollapsibleContentNode } from "./plugins/CollapsiblePlugin/CollapsibleContentNode";

import InitDataPlugin from "./plugins/InitDataPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CustomQuoteContainer } from "./plugins/CustomQuote/CustomQuoteContainer";
export default function AppEditor() {
  const config: InitialConfigType = {
    namespace: "AppEditor",
    // editable: false,
    nodes: [
      CollapsibleContainerNode,
      CollapsibleTitleNode,
      CollapsibleContentNode,
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CustomQuoteContainer,
      // CodeNode,
      // CodeHighlightNode,
      // TableNode,
      // TableCellNode,
      // TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
    onError: (err) => {
      console.log(err);
    },
    // theme: {
    //   paragraph: "editor-paragraph",
    //   heading: {
    //     h2: "editor-h2",
    //   },
    // },
  };

  return (
    <div className="AppEditor max-w-xl mx-auto">
      <LexicalComposer initialConfig={config}>
        {/* <ToolbarPlugin /> */}
        <InitDataPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="ContentEditable min-h-96 text-xl border ring-0 focus:ring-0 focus-within:ring-0 focus:outline-none" />
          }
          placeholder={<div>Placeholder</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <EditorOnChangePlugin />
        <HistoryPlugin />
        <LinkPlugin />
        <ListPlugin />

        <CollapsiblePlugin />
      </LexicalComposer>
    </div>
  );
}
