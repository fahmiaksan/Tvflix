import { useInfiniteQuery } from '@tanstack/react-query';
import { getDiscoverMovies } from "../http";

export const useGetDiscoverMovies = (sort) => useInfiniteQuery({
  queryKey: ['discoverMovies', sort],
  queryFn: async ({ pageParam = 1 }) => await getDiscoverMovies(sort, pageParam),
  getNextPageParam: (lastPage) => {
    if (lastPage.page < lastPage.total_pages) {
      return lastPage.page + 1
    }
    return undefined
  }
})