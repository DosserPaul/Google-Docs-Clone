"use client";

import React, {useRef, useState} from "react";
import {BsCloudCheck, BsCloudSlash} from "react-icons/bs";
import {toast} from "sonner";
import {useMutation} from "convex/react";
import {useStatus} from "@liveblocks/react/suspense";
import {api} from "../../convex/_generated/api";
import {Id} from "../../convex/_generated/dataModel";

import {useDebounce} from "@/hooks/use-debounce";
import {LoaderIcon} from "lucide-react";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

const DocumentInput = ({title, id}: DocumentInputProps) => {
  const status = useStatus();

  const [value, setValue] = useState<string>(title);

  const [isError, setIsError] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.update);

  const debouncedUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    setIsPending(true);
    mutate({id, title: newValue})
      .then(() => {
        toast.success("Document updated");
        setIsEditing(false);
      })
      .catch(() => {
        toast.error("Error updating document");
        setIsError(true);
      })
      .finally(() => setIsPending(false));
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedUpdate(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);
    mutate({id, title: value})
      .then(() => toast.success("Document updated"))
      .catch(() => toast.error("Error updating document"))
      .finally(() => setIsPending(false));
  }

  const showLoader = isPending || status === "connecting" || status === "reconnecting";
  const showError = isError || status === "disconnected";

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form className="relative w-fit max-w-[50ch]" onSubmit={handleSubmit}>
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          className="text-lg px-1.5 cursor-pointer truncate"
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
        >
          {title}
        </span>
      )}
      {showError && <BsCloudSlash className="text-red-500 size-4"/>}
      {!showError && !showLoader && <BsCloudCheck className="text-green-500 size-4"/>}
      {showLoader && <LoaderIcon className="size-4 animate-spin text-muted-foreground"/>}
    </div>
  );
}

export default DocumentInput;
