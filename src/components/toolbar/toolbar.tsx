"use client";

import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  Printer,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon
} from "lucide-react";
import {useEditorStore} from "@/store/use-editor-store";
import FontFamilyButton from "@/components/toolbar/font-family-button";
import ToolbarButton from "@/components/toolbar/toolbar-button";
import HeadingLevelButton from "@/components/toolbar/heading-level-button";
import TextColorButton from "@/components/toolbar/text-color-button";
import HighlightColorButton from "@/components/toolbar/highlight-color-button";
import LinkButton from "@/components/toolbar/link-button";
import ImageButton from "@/components/toolbar/image-button";
import AlignButton from "@/components/toolbar/align-button";
import ListButton from "@/components/toolbar/list-button";
import FontSizeButton from "@/components/toolbar/font-size-button";
import LineHeightButton from "@/components/toolbar/line-height-button";

const Toolbar = () => {
  const {editor} = useEditorStore();

  const section: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: Printer,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const currentState = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute("spellcheck", currentState === "false" ? "ture" : "false");
        }
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
      {
        label: "Strikethrough",
        icon: StrikethroughIcon,
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive("strike"),
      },
      {
        label: "Code",
        icon: CodeIcon,
        onClick: () => editor?.chain().focus().toggleCode().run(),
        isActive: editor?.isActive("code"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive("liveblocksCommentMark"),
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      }
    ]
  ]

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {section[0].map((item) => (
        <ToolbarButton key={item.label} {...item}/>
      ))}

      <div className="h-7 w-[1px] bg-neutral-300"/>
      <FontFamilyButton/>
      <div className="h-7 w-[1px] bg-neutral-300"/>
      <HeadingLevelButton/>
      <div className="h-7 w-[1px] bg-neutral-300"/>
      <FontSizeButton/>
      <div className="h-7 w-[1px] bg-neutral-300"/>
      {section[1].map((item) => (
        <ToolbarButton key={item.label} {...item}/>
      ))}
      <div className="h-7 w-[1px] bg-neutral-300"/>
      <TextColorButton/>
      <HighlightColorButton/>
      <div className="h-7 w-[1px] bg-neutral-300"/>
      <LinkButton/>
      <ImageButton/>
      <AlignButton/>
      <LineHeightButton/>
      <ListButton/>
      <div className="h-7 w-[1px] bg-neutral-300"/>
      {section[2].map((item) => (
        <ToolbarButton key={item.label} {...item}/>
      ))}
    </div>
  );
}

export default Toolbar;
