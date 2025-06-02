// src/utils/pagination.ts
export type PaginationParams = {
  page?: number
  limit?: number
}

export type PaginationResult = {
  skip: number
  take: number
  page: number
  limit: number
}

export function getPagination({
  page = 1,
  limit = 10
}: PaginationParams): PaginationResult {
  const safePage = Math.max(Number(page), 1)
  const safeLimit = Math.max(Number(limit), 1)

  return {
    skip: (safePage - 1) * safeLimit,
    take: safeLimit,
    page: safePage,
    limit: safeLimit
  }
}
