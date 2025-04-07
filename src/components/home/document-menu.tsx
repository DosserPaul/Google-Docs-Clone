import {ExternalLinkIcon, MoreVertical, PenIcon, TrashIcon} from "lucide-react";
import {Id} from "../../../convex/_generated/dataModel";

import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import RemoveDocumentDialog from "@/components/home/remove-document-dialog";
import UpdateDocumentDialog from "@/components/home/update-document-dialog";

interface DocumentMenuProps {
  documentId: Id<"documents">;
  title: string;
  onNewTabClick: (id: Id<"documents">) => void;
}

const DocumentMenu = ({documentId, title, onNewTabClick}: DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical className="size-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <UpdateDocumentDialog documentId={documentId} title={title}>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
            }}
            onSelect={(e) => {
              e.preventDefault()
            }}
          >
            <PenIcon className="size-4 mr-2"/>
            Rename
          </DropdownMenuItem>
        </UpdateDocumentDialog>
        <RemoveDocumentDialog documentId={documentId}>
          <DropdownMenuItem
            className="text-red-500"
            onSelect={(e => {
              e.preventDefault()
            })}
            onClick={(e => {
              e.stopPropagation()
            })}
          >
            <TrashIcon className="size-4 mr-2 text-red-500"/>
            Remove
          </DropdownMenuItem>
        </RemoveDocumentDialog>
        <DropdownMenuItem
          onClick={() => {
            onNewTabClick(documentId)
          }}
        >
          <ExternalLinkIcon className="size-4 mr-2"/>
          Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DocumentMenu;
