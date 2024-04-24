import { useQuery } from "@tanstack/react-query"
import { getCastListMovies } from "../http"

export const useCastListMovies = (movieId) => {

  return useQuery({
    queryKey: ['castList', movieId],
    queryFn: async () => {
      return await getCastListMovies(movieId)
    },
  })
}