import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const MAX_PAGE_WINDOW = 5;

export default function MyPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const TOTAL_PAGES = 7;

  // Calculate window range
  const startPage = Math.max(1, currentPage - MAX_PAGE_WINDOW + 1);
  const endPage = Math.min( TOTAL_PAGES, startPage + MAX_PAGE_WINDOW - 1 );

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            isActive={currentPage === 1} 
            aria-disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          />
        </PaginationItem>

        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            isActive={currentPage === TOTAL_PAGES}
            aria-disabled={currentPage === TOTAL_PAGES}
            onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
