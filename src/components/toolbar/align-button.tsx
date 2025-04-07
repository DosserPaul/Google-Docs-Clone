import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {useEditorStore} from "@/store/use-editor-store";
import {cn} from "@/lib/utils";
import {AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon,} from "lucide-react";

const AlignButton = () => {
  const {editor} = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  const activeAlignment = alignments.find(({value}) =>
    editor?.isActive("textAlign", {textAlign: value})
  );

  const ActiveIcon = activeAlignment?.icon || AlignLeftIcon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer px-1.5 overflow-hidden text-sm"
          )}
        >
          <ActiveIcon className="size-4"/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-x-1">
        {alignments.map(({label, value, icon: Icon}) => (
          <button
            key={value}
            onClick={() => {
              editor?.chain().focus().setTextAlign(value).run();
            }}
            className={cn(
              "flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80 text-sm",
              editor?.isActive("textAlign", {textAlign: value}) &&
              "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4"/>
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AlignButton;
