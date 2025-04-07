import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {useEditorStore} from "@/store/use-editor-store";
import {cn} from "@/lib/utils";
import {ListIcon, ListOrderedIcon,} from "lucide-react";

const ListButton = () => {
  const {editor} = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  // Trouver la liste active
  const activeList = lists.find(({isActive}) => isActive());

  const ActiveIcon = activeList?.icon || ListIcon;

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
        {lists.map(({label, icon: Icon, isActive, onClick}) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80 text-sm",
              isActive() && "bg-neutral-200/80"
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

export default ListButton;
