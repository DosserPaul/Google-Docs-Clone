import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {useEditorStore} from "@/store/use-editor-store";
import {cn} from "@/lib/utils";
import {ListCollapseIcon} from "lucide-react";

const LineHeightButton = () => {
  const {editor} = useEditorStore();

  const lineHeights = [
    {label: "Default", value: "normal"},
    {label: "Single", value: "1"},
    {label: "1.15", value: "1.15"},
    {label: "1.5", value: "1.5"},
    {label: "Double", value: "2"},
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer px-1.5 overflow-hidden text-sm"
          )}
        >
          <ListCollapseIcon className="size-4"/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-x-1">
        {lineHeights.map(({label, value}) => (
          <button
            key={value}
            onClick={() => {
              editor?.chain().focus().setLineHeight(value).run();
            }}
            className={cn(
              "flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80 text-sm",
              editor?.getAttributes("paragraph").lineHeight === value &&
              "bg-neutral-200/80"
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LineHeightButton;
