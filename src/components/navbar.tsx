"use client";

import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {
  BoldIcon,
  CodeIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TableIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon
} from "lucide-react";
import {BsFilePdf} from "react-icons/bs";
import {OrganizationSwitcher} from "@clerk/nextjs";
import {UserButton} from "@clerk/clerk-react";
import {useMutation} from "convex/react";
import {Doc} from "../../convex/_generated/dataModel";
import {api} from "../../convex/_generated/api";
import {toast} from "sonner";

import DocumentInput from "@/components/document-input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from "@/components/ui/menubar";

import {useEditorStore} from "@/store/use-editor-store";
import TableGridSelector from "@/components/table-grid-selector";
import Avatars from "@/components/toolbar/avatars";
import Inbox from "@/components/document/inbox";
import UpdateDocumentDialog from "@/components/home/update-document-dialog";
import RemoveDocumentDialog from "@/components/home/remove-document-dialog";


interface NavbarProps {
  data: Doc<"documents">;
}

const Navbar = ({data}: NavbarProps) => {
  const router = useRouter();
  const {editor} = useEditorStore();
  const isMac = typeof window !== "undefined" && window.navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  const mutation = useMutation(api.documents.create);

  const handleNewDocuments = () => {
    mutation({
      title: "Untitled Document",
      initialContent: ""
    })
      .then((id) => {
        toast.success("Document created");
        router.push(`/documents/${id}`);
      })
      .catch(() => toast.error("Error creating document"));
  }

  const insertTable = (rows: number, cols: number) => {
    editor?.chain().focus().insertTable({rows, cols, withHeaderRow: true}).run();
  }

  const handleDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }

  const handleSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {type: "application/json"});
    handleDownload(blob, `${data.title}.json`);
  }

  const handleSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {type: "text/html"});
    handleDownload(blob, `${data.title}.html`);
  }

  const handleSavePDF = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {type: "application/pdf"});
    handleDownload(blob, `${data.title}.pdf`);
  }

  const handleSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], {type: "text/plain"});
    handleDownload(blob, `${data.title}.txt`);
  }

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36}/>
        </Link>
        <div className="flex flex-col">
          <DocumentInput title={data.title} id={data._id}/>

          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger
                  className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hiden">
                  <MenubarSub>
                    <MenubarSubTrigger className="cursor-pointer">
                      <FileIcon className="size-4 mr-2"/>
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={handleSaveJSON}>
                        <FileJsonIcon className="size-4 mr-2"/>
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={handleSaveHTML}>
                        <GlobeIcon className="size-4 mr-2"/>
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={handleSavePDF}>
                        <BsFilePdf className="size-4 mr-2"/>
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={handleSaveText}>
                        <FileTextIcon className="size-4 mr-2"/>
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={handleNewDocuments}>
                    <FilePlusIcon className="size-4"/>
                    New Document
                  </MenubarItem>
                  <MenubarSeparator/>
                  <UpdateDocumentDialog documentId={data._id} title={data.title}>
                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <FilePenIcon className="size-4"/>
                      Rename
                    </MenubarItem>
                  </UpdateDocumentDialog>
                  <RemoveDocumentDialog documentId={data._id}>
                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <TrashIcon className="size-4"/>
                      Remove
                    </MenubarItem>
                  </RemoveDocumentDialog>
                  <MenubarSeparator/>
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4"/>
                    Print
                    <MenubarShortcut>
                      {isMac ? "⌘P" : "Ctrl + P"}
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger
                  className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                    <Undo2Icon className="size-4 mr-2"/>
                    Undo
                    <MenubarShortcut>
                      {isMac ? "⌘Z" : "Ctrl + Z"}
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                    <Redo2Icon className="size-4 mr-2"/>
                    Redo
                    <MenubarShortcut>
                      {isMac ? "⌘Y" : "Ctrl + Y"}
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger
                  className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TableIcon className="size-4 mr-2"/>
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <TableGridSelector onSelect={(rows, cols) => insertTable(rows, cols)}/>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger
                  className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4 mr-2"/>
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                        <BoldIcon className="size-4 mr-2"/>
                        Bold
                        <MenubarShortcut>
                          {isMac ? "⌘B" : "Ctrl + B"}
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                        <ItalicIcon className="size-4 mr-2"/>
                        Italic
                        <MenubarShortcut>
                          {isMac ? "⌘I" : "Ctrl + I"}
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                        <UnderlineIcon className="size-4 mr-2"/>
                        Underline
                        <MenubarShortcut>
                          {isMac ? "⌘U" : "Ctrl + U"}
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleCode().run()}>
                        <CodeIcon className="size-4 mr-2"/>
                        Code
                        <MenubarShortcut>
                          {isMac ? "⌘E" : "Ctrl + E"}
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                        <StrikethroughIcon className="size-4 mr-2"/>
                        Strikethrough
                        <MenubarShortcut>
                          {isMac ? "⌘D" : "Ctrl + D"}
                        </MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                    <RemoveFormattingIcon className="size-4"/>
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Avatars/>
        <Inbox/>
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton/>
      </div>
    </nav>
  );
}

export default Navbar;
