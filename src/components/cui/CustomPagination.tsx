"use client"

import { useSearchParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Suspense } from "react";
// import { useEffect, useState } from "react";

const MAX_PAGE_WINDOW = 5;

function MyPaginationSuspense({TOTAL_PAGES=5}: {TOTAL_PAGES?: number}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get current page from URL or default to 1
  const currentPage = parseInt(searchParams.get('page') || '1');
  // const [internalPage, setInternalPage] = useState(currentPage);

  // Calculate window range (same logic as before)
  const startPage = Math.max(1, currentPage - MAX_PAGE_WINDOW + 1);
  const endPage = Math.min(TOTAL_PAGES, startPage + MAX_PAGE_WINDOW - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Update both URL and internal state
  const handlePageChange = (newPage: number) => {
    // setInternalPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Sync internal state with URL on mount
  // useEffect(() => {
  //   setInternalPage(currentPage);
  // }, [currentPage]);

  return (
    <div className="relative">
      <p className="absolute top-2 left-2 text-gray-500 font-semibold ">{`Showing ${currentPage} to ${TOTAL_PAGES} pages`}</p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              isActive={currentPage === 1}
              aria-disabled={currentPage === 1}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>

          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              isActive={currentPage === TOTAL_PAGES}
              aria-disabled={currentPage === TOTAL_PAGES}
              onClick={() => handlePageChange(Math.min(TOTAL_PAGES, currentPage + 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default function CustomPagination({TOTAL_PAGES}: {TOTAL_PAGES?: number}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyPaginationSuspense TOTAL_PAGES={TOTAL_PAGES} />
    </Suspense>
  );
}