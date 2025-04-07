import {Id} from "../../../../convex/_generated/dataModel";
import {auth} from "@clerk/nextjs/server";

import Documents from "@/components/document/documents";
import {preloadQuery} from "convex/nextjs";
import {api} from "../../../../convex/_generated/api";

interface DocumentsIdPageProps {
  params: Promise<{ documentId: Id<"documents"> }>;
}

const DocumentsIdPage = async ({params}: DocumentsIdPageProps) => {
  const {documentId} = await params;

  const {getToken} = await auth();
  const token = await getToken({template: "convex"}) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    {id: documentId},
    {token}
  )

  if (!preloadedDocument) {
    throw new Error("Document not found");
  }

  return <Documents preloadedDocument={preloadedDocument}/>;
}

export default DocumentsIdPage;
