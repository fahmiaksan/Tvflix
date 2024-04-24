import { useQuery } from '@tanstack/react-query';
import { getMovieDetail } from "../http";

export const useGetMovieDetail = (movieId) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: async () => {
      return await getMovieDetail(movieId)
    },

  })
}
