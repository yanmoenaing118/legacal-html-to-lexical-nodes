import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { MenuOption } from "@lexical/react/LexicalNodeMenuPlugin";
import {
  LexicalTypeaheadMenuPlugin,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import {
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  TextNode,
} from "lexical";
import { useCallback, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";

class ComponentPickerOption extends MenuOption {
  // What shows up in the editor
  title: string;
  // Icon for display
  icon?: JSX.Element;
  // For extra searching.
  keywords: Array<string>;
  // TBD
  keyboardShortcut?: string;
  // What happens when you select this option?
  onSelect: (queryString: string) => void;

  constructor(
    title: string,
    options: {
      icon?: JSX.Element;
      keywords?: Array<string>;
      keyboardShortcut?: string;
      onSelect: (queryString: string) => void;
    }
  ) {
    super(title);
    this.title = title;
    this.keywords = options.keywords || [];
    this.icon = options.icon;
    this.keyboardShortcut = options.keyboardShortcut;
    this.onSelect = options.onSelect.bind(this);
  }
}

function ComponentPickerMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: {
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  option: ComponentPickerOption;
}) {
  let className = "item";
  if (isSelected) {
    className += " selected";
  }
  return (
    <li
      key={option.key}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={"typeahead-item-" + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {option.icon}
      <span className="text">{option.title}</span>
    </li>
  );
}

function getDynamicOptions(editor: LexicalEditor, queryString: string) {
  const options: Array<ComponentPickerOption> = [];

  if (queryString == null) {
    return options;
  }

  return options;
}

function getBaseOptions(editor: LexicalEditor) {
  return [
    new ComponentPickerOption("Paragraph", {
      icon: <i className="icon paragraph" />,
      keywords: ["normal", "paragraph", "p", "text"],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
          }
        }),
    }),
  ];
}

export default function ComponentPickerMenuPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const bgRef = useRef(null);
  const [queryString, setQueryString] = useState<string | null>(null);

  const [rect, setRect] = useState<DOMRect>();

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0,
  });

  const options = useMemo(() => {
    const baseOptions = getBaseOptions(editor);
    // console.log("querystring", queryString);

      if (!queryString) {
        return baseOptions;
      }

      const regex = new RegExp(queryString, 'i');

    return [...baseOptions.filter((option) => {
      return regex.test(option.title) ||
          option.keywords.some((keyword) => regex.test(keyword))
    })];
  }, [editor, queryString]);

  const width = useMemo(() => {
    if (queryString?.length == 0 || !bgRef.current || !rect) return 0;

    const bgEl = bgRef.current as HTMLElement;
    console.log(bgEl);
    bgEl.style.left = `${rect.left}px`;
    bgEl.style.top = `${rect.top}px`;

    const w = (queryString?.length ? queryString.length + 1 : 0) * 8;
    return w;
  }, [queryString, rect]);

  const onSelectOption = useCallback(
    (
      selectedOption: ComponentPickerOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void,
      matchingString: string
    ) => {
      editor.update(() => {
        nodeToRemove?.remove();
        selectedOption.onSelect(matchingString);
        closeMenu();
      });
    },
    [editor]
  );

  return (
    <>
      <div
        ref={bgRef}
        className="fixed left-0 top-0 h-[20px] bg-red-50 w-[30px] p-3"
        style={{
          width: `${width}px`,
          display: rect ? "block" : "none"
        }}
      ></div>
      <LexicalTypeaheadMenuPlugin<ComponentPickerOption>
        onQueryChange={setQueryString}
        onSelectOption={onSelectOption}
        triggerFn={checkForTriggerMatch}
        options={options}
        onOpen={(res) => {
          console.log("res", res.match?.replaceableString.length);
          const rect = res.getRect();
          // console.log("rect", rect);
          // if (!bgRef.current) return;
          // const bgEl = bgRef.current as HTMLElement;
          // console.log(bgEl);
          // bgEl.style.left = `${rect.left}px`;
          // bgEl.style.top = `${rect.top}px`;
          // let w = (res.match?.replaceableString.length ? res.match?.replaceableString.length : 1) * 10;
          // bgEl.style.width = `${w}px`;
          setRect(rect);
        }}
        onClose={() => setRect(undefined)}
        menuRenderFn={(
          anchorElementRef,
          { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
        ) =>
          anchorElementRef.current && options.length
            ? ReactDOM.createPortal(
                <div className="typeahead-popover component-picker-menu">
                  <ul>
                    {options.map((option, i: number) => (
                      <ComponentPickerMenuItem
                        index={i}
                        isSelected={selectedIndex === i}
                        onClick={() => {
                          setHighlightedIndex(i);
                          selectOptionAndCleanUp(option);
                        }}
                        onMouseEnter={() => {
                          setHighlightedIndex(i);
                        }}
                        key={option.key}
                        option={option}
                      />
                    ))}
                  </ul>
                </div>,
                anchorElementRef.current
              )
            : null
        }
      />
    </>
  );
}
