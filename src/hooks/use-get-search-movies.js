import { useInfiniteQuery } from "@tanstack/react-query"
import { getSearchMovies } from "../http"

export const useGetSearchMovies = (search) => {

  return useInfiniteQuery({
    queryKey: ['search', search],
    queryFn: async ({ pageParam = 1 }) => {
      return await getSearchMovies(search, pageParam)
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
    }
  });
}