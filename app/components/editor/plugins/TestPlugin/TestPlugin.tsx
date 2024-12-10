import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { mergeRegister } from "@lexical/utils";
import { TextNode } from "lexical";

export default function TestPlugin() {

    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return mergeRegister(
            editor.registerNodeTransform(TextNode, node => {
                const textContext = node.getTextContent();
                if(textContext === "bold" && !node.hasFormat("bold") ) {
                    node.setFormat("bold");
                    node.setStyle("background-color: red; padding: 2px;");

                    
                }
                
                
            })
        )
    }, [editor])
  return null;
}
