"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function CustomSearchBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-500" />
      <Input
        className="w-full rounded-full bg-background pl-12 pr-2 py-2 h-12 focus-visible:ring focus-visible:ring-primary/50 font-semibold text-2xl"
        placeholder="Search here..."
        type="search"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}