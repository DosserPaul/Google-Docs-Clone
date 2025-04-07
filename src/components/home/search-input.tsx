"use client";

import {ChangeEvent, FormEvent, useRef, useState} from "react";
import {SearchIcon, XIcon} from "lucide-react";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useSearchParam} from "@/hooks/use-search-parm";

const SearchInput = () => {
  const [search, setSearch] = useSearchParam();
  const [searchValue, setSearchValue] = useState(search);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const handleClearInput = () => {
    setSearchValue("");
    setSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchValue);
    inputRef.current?.blur();
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <form action="" className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
        <Input
          placeholder="Search..."
          className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none bg-[#F0F3F8] rounded-full h-[48px]"
          value={searchValue}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full hover:bg-neutral-200/80 focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73.3),0_1px_2px_0_rgba(65,69,73.3)] hover:cursor-pointer"
        >
          <SearchIcon/>
        </Button>
        {searchValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full hover:bg-neutral-200/80 focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73.3),0_1px_2px_0_rgba(65,69,73.3)] hover:cursor-pointer"
            onClick={handleClearInput}
          >
            <XIcon/>
          </Button>
        )}
      </form>
    </div>
  )
}

export default SearchInput;
