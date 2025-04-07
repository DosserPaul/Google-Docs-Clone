import {Id} from "../../../convex/_generated/dataModel";
import React, {ReactNode, useState} from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {useMutation} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

interface UpdateDocumentDialogProps {
  documentId: Id<"documents">;
  title: string;
  children: ReactNode;
}

const UpdateDocumentDialog = ({documentId, title, children}: UpdateDocumentDialogProps) => {
  const update = useMutation(api.documents.update);
  const [value, setValue] = useState(title);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    update({id: documentId, title: value.trim() || "Untitled"})
      .then(() => {
        toast.success("Document updated successfully");
      })
      .catch((error) => {
        toast.error("Failed to update document");
        console.error("Error updating document:", error);
      })
      .finally(() => {
        setIsUpdating(false);
        setIsOpen(false);
      });
  }


  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Rename document
            </AlertDialogTitle>
            <AlertDialogDescription>
              Enter a new name for your document. This will not affect the content of the document, only its title.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            className="my-5"
            placeholder="New document name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <AlertDialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              disabled={isUpdating}
            >
              Save
            </Button>
          </AlertDialogFooter>
        </form>

      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdateDocumentDialog;
