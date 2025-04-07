"use client";

import {EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import {TaskItem} from "@tiptap/extension-task-item";
import {TaskList} from "@tiptap/extension-task-list";
import {Table} from "@tiptap/extension-table";
import {TableRow} from "@tiptap/extension-table-row";
import {TableHeader} from "@tiptap/extension-table-header";
import {TableCell} from "@tiptap/extension-table-cell";
import {ImageResize} from "tiptap-extension-resize-image";
import Image from '@tiptap/extension-image'
import {Underline} from "@tiptap/extension-underline";
import {FontFamily} from "@tiptap/extension-font-family";
import {TextStyle} from "@tiptap/extension-text-style";
import {Highlight} from "@tiptap/extension-highlight";
import {Color} from "@tiptap/extension-color";
import {Link} from "@tiptap/extension-link";
import {TextAlign} from "@tiptap/extension-text-align";

import {useEditorStore} from "@/store/use-editor-store";
import {FontSizeExtension} from "@/extentions/font-size";
import {LineHeightExtension} from "@/extentions/line-height";
import Ruler from "@/components/editor/ruler";
import {useLiveblocksExtension} from "@liveblocks/react-tiptap";
import {Threads} from "@/components/editor/threads";
import {useStorage} from "@liveblocks/react";
import {LEFT_MARGIN, RIGHT_MARGIN} from "@/constants/margins";

interface EditorProps {
  initialContent?: string;
}

const EditorPage = ({initialContent}: EditorProps) => {
  const leftMargin = useStorage(root => root.leftMargin);
  const rightMargin = useStorage(root => root.rightMargin);
  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });
  const {setEditor} = useEditorStore();

  const editor = useEditor({
    immediatelyRender: false,
    onCreate({editor}) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({editor}) {
      setEditor(editor);
    },
    onSelectionUpdate({editor}) {
      setEditor(editor);
    },
    onTransaction({editor}) {
      setEditor(editor);
    },
    onFocus({editor}) {
      setEditor(editor);
    },
    onBlur({editor}) {
      setEditor(editor);
    },
    onContentError({editor}) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin ?? LEFT_MARGIN}px; padding-right: ${rightMargin ?? RIGHT_MARGIN}px;`,
        class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text rounded",
      }
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      Image,
      ImageResize,
      TaskItem.configure({
        nested: true
      }),
      TaskList,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Underline,
      FontFamily,
      TextStyle,
      Highlight.configure({multicolor: true}),
      TextStyle.configure({mergeNestedSpanStyles: true}),
      Color,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "blockquote", "listItem"],
      }),
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal",
      })
    ],
    content: "",
  })

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler/>
      <div className="min-w-full flex justify-center w-[816px] py-4 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor}/>
        <Threads editor={editor}/>
      </div>
    </div>
  );
}

export default EditorPage;
