"use client";

import {Preloaded, usePreloadedQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";

import Editor from "@/app/documents/[documentId]/editor";
import Toolbar from "@/components/toolbar/toolbar";
import Navbar from "@/components/navbar";
import {Room} from "@/app/room";

interface DocumentsProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

const Documents = ({preloadedDocument}: DocumentsProps) => {
  const document = usePreloadedQuery(preloadedDocument);

  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 bg-[#FAFBFD] print:hidden z-[99]">
          <Navbar data={document}/>
          <Toolbar/>
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor initialContent={document.initialContent}/>
        </div>
      </div>
    </Room>
  );
}

export default Documents;
