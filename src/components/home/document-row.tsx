import {Doc, Id} from "../../../convex/_generated/dataModel";
import {SiGoogledocs} from "react-icons/si";
import {TableCell, TableRow} from "@/components/ui/table";
import {Building2Icon, CircleUserIcon,} from "lucide-react";
import {format} from "date-fns";
import DocumentMenu from "@/components/home/document-menu";

interface DocumentRowProps {
  document: Doc<"documents">;
}

const DocumentRow = ({document}: DocumentRowProps) => {
  const handleOnNewTabClick = (id: Id<"documents">) => {
    window.open(`/documents/${id}`, "_blank");
  };

  const handleOnClickRow = (id: Id<"documents">) => {
    window.open(`/documents/${id}`, "_self");
  }

  return (
    <TableRow className="hover:bg-muted/30 cursor-pointer" onClick={() => handleOnClickRow(document._id)}>
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500"/>
      </TableCell>
      <TableCell className="font-medium md:w-[45%] truncate">
        {document.title}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        <div className="flex items-center gap-2">
          {document.organizationId ? (
            <Building2Icon className="size-4"/>
          ) : (
            <CircleUserIcon className="size-4"/>
          )}
          {document.organizationId ? "Organization" : "Private"}
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="text-right">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTabClick={handleOnNewTabClick}
        />
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;
