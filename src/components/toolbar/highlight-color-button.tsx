import {CirclePicker, type ColorResult} from "react-color";

import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useEditorStore} from "@/store/use-editor-store";
import {cn} from "@/lib/utils";
import {HighlighterIcon} from "lucide-react";

const HighlightColorButton = () => {
  const {editor} = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({color: color.hex}).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer px-1.5 overflow-hidden text-sm"
          )}
        >
          <HighlighterIcon className="size-4" style={{color: value}}/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <CirclePicker
          color={value}
          onChange={onChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default HighlightColorButton;
