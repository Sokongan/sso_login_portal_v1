import { useState } from "react";

const ITEMS_PER_PAGE = 5;

export function usePagination<T>(items: T[]) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedItems = items.slice(start, end);

  const goToNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const resetPage = () => {
    setPage(1);
  };

  return {
    page,
    totalPages,
    paginatedItems,
    goToNextPage,
    goToPreviousPage,
    resetPage,
    setPage,
  };
}