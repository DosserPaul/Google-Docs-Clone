"use client";

import React, {useEffect, useRef, useState} from "react";
import {MinusIcon, PlusIcon} from "lucide-react";

import {useEditorStore} from "@/store/use-editor-store";

const FontSizeButton = () => {
  const {editor} = useEditorStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const rawFontSize = editor?.getAttributes("textStyle").fontSize;
  const defaultFontSize = "16";
  const currentFontSize = rawFontSize ? rawFontSize.replace(/px/g, "") : defaultFontSize;

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFontSize(currentFontSize);
  }, [currentFontSize]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const input = inputRef.current;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }, [isEditing]);

  const applyFontSize = (size: string) => {
    const parsed = parseInt(size, 10);
    if (!isNaN(parsed) && parsed > 0) {
      editor?.chain().focus().setFontSize(`${parsed}px`).run();
      setFontSize(parsed.toString());
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(e.target.value);
  };

  const handleInputBlur = () => {
    applyFontSize(fontSize);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyFontSize(fontSize);
      editor?.commands.focus();
    }
  };

  const increaseFontSize = () => {
    applyFontSize((parseInt(fontSize) + 1).toString());
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(1, parseInt(fontSize) - 1);
    applyFontSize(newSize.toString());
  };

  if (!editor) return null;

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decreaseFontSize}
        className="h-7 w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer"
        title="Decrease font size"
        aria-label="Decrease font size"
      >
        <MinusIcon className="size-4"/>
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={fontSize}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 text-sm text-center rounded-sm border border-neutral-400 bg-transparent focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="h-7 w-10 text-sm text-center rounded-sm border border-neutral-400 bg-transparent cursor-text"
          title="Edit font size"
          aria-label="Edit font size"
        >
          {fontSize}
        </button>
      )}

      <button
        onClick={increaseFontSize}
        className="h-7 w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer"
        title="Increase font size"
        aria-label="Increase font size"
      >
        <PlusIcon className="size-4"/>
      </button>
    </div>
  );
};

export default FontSizeButton;
