import {Id} from "../../../convex/_generated/dataModel";
import React, {ReactNode, useState} from "react";
import {useMutation} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface RemoveDocumentDialogProps {
  documentId: Id<"documents">;
  children: ReactNode;
}

const RemoveDocumentDialog = ({documentId, children}: RemoveDocumentDialogProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRemoving(true);
    remove({id: documentId})
      .then(() => {
        router.push("/");
        toast.success("Document deleted successfully");
      })
      .catch((error) => {
        toast.error("Failed to delete document");
        console.error("Error deleting document:", error);
      })
      .finally(() => setIsRemoving(false));
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this document?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All data associated with this document will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            disabled={isRemoving}
            onClick={(e) => handleDelete(e)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveDocumentDialog;
