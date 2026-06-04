import { useCallback, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 5;

export function usePagination<T>(items: T[]) {
  const [page, setPage] = useState(1);

  const { totalPages, start, end } = useMemo(() => {
    const tp = Math.ceil(items.length / ITEMS_PER_PAGE);
    const s = (page - 1) * ITEMS_PER_PAGE;
    const e = s + ITEMS_PER_PAGE;
    return { totalPages: tp, start: s, end: e };
  }, [items.length, page]);

  const paginatedItems = useMemo(() => items.slice(start, end), [items, start, end]);

  const goToNextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

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