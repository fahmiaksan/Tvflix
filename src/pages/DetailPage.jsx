import { useParams } from "react-router-dom";
import MainLayouts from "../layout/MainLayouts"
import { useGetMovieDetail } from "../hooks/get-movie-detail";
import { useCallback, useEffect, useState } from "react";
import { calcTime, getImageGenerator } from '../utils';
import { BASE_TMDB_IMAGE_URL, MOVIE_BACKDROP_SIZE } from "../configs";
import { Button, Image, Skeleton } from "@nextui-org/react";
import { movieRatingListAtom } from "../components/atom/movie-rating";
import dayjs from "dayjs";
import MovieRate from "../components/MovieRate";
import { useAtomValue } from "jotai";
import CastList from "../components/CastList";
import { useCastListMovies } from "../hooks/use-cast-list-movies";
function DetailPage() {
  const { movieId } = useParams();
  const { data, isLoading } = useGetMovieDetail(movieId);
  const { data: castList, isLoading: isLoadingCast } = useCastListMovies(movieId);
  const movieBackdropUrl = `${BASE_TMDB_IMAGE_URL}/${MOVIE_BACKDROP_SIZE}/${data?.backdrop_path}`;
  const [backdropImageDominantColor, setBackdropImageDominantColor] = useState([0, 0, 0]);
  const posterUrl = `${BASE_TMDB_IMAGE_URL}/w500/${data?.poster_path}`;
  const movieRatingList = useAtomValue(movieRatingListAtom);
  const movieRating = movieRatingList?.find((movie) => movie.movieId === data?.id);
  const directorMovie = castList?.crew?.find((crew) => crew.job === 'Director');
  const movieScreenplay = castList?.crew?.find((crew) => crew.job === 'Screenplay');
  const downloadMovie = () => {
    window.open(`https://dl.lk21static.xyz/get/${data?.original_title.toLowerCase().replaceAll(' ', '-')}-${dayjs(data?.release_date).format("YYYY")}`, '_blank');
  };
  useEffect(() => {
    (async () => {
      const dominantColor = await getImageGenerator(data?.backdrop_path);
      if (dominantColor) {
        const [r, g, b] = dominantColor.value;
        setBackdropImageDominantColor([r, g, b]);
      }
    });
  }, [data]);
  const generateGenre = useCallback(() => {
    if (data && data.genres && !isLoading) {
      return data.genres.map((genre) => genre.name).join(', ');
    }
  }, [data, isLoading]);
  return (
    <MainLayouts>
      <div
        className="w-full bg-auto bg-no-repeat bg-center rounded-3xl overflow-hidden"
        style={{ backgroundImage: `url(${movieBackdropUrl})` }}
      >
        <div
          className="p-12 backdrop-blur"
          style={{
            backgroundColor: `rgba(${[...backdropImageDominantColor]}, 0.7)`
          }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="grow-0 shrink-0 self-center">
              <Skeleton
                className="rounded-2xl h-[384px] !bg-transparent"
                isLoaded={!isLoading}
              >
                <Image
                  className="w-64 shadow-2xl"
                  src={posterUrl}
                  alt={`${data?.original_title} poster`}
                />
              </Skeleton>
            </div>
            <div className="py-4 !text-white w-full">
              {
                isLoading ? (
                  <Skeleton
                    className="!bg-transparent rounded-xl w-2/5 h-9"
                  />
                ) : (
                  <div className="flex gap-x-3 items-center">
                    <h1 className="text-3xl font-bold mb-1">
                      {data?.original_title}{" "}
                      <span className="font-normal">
                        ({dayjs(data?.release_date).format("YYYY")})
                      </span>
                    </h1>
                    <MovieRate rating={movieRating?.rating} movieId={data?.id} />
                  </div>
                )
              }
              <p>
                {
                  data?.release_date && (
                    <>
                      <span>{dayjs(data?.release_date).format("DD/MM/YYYY")}</span>
                      <span className="px-2">•</span>
                    </>
                  )
                }
                <span>{generateGenre()}</span>

                {data?.runtime && (
                  <>
                    <span className="px-2">•</span>
                    <span>{calcTime(data.runtime)}</span>
                  </>
                )}
              </p>
              <p className="font-bold text-xl mt-8 mb-2">Overview</p>
              {isLoading ? (
                <div className="flex flex-col gap-y-2">
                  <Skeleton className="!bg-transparent rounded-xl w-full h-4" />
                  <Skeleton className="!bg-transparent rounded-xl w-full h-4" />
                  <Skeleton className="!bg-transparent rounded-xl w-4/5 h-4" />
                </div>
              ) : (
                <>
                  <p>{data?.overview}</p>
                  <div className="flex flex-col md:flex-row gap-y-6 gap-x-32 mt-8">
                    {directorMovie && (
                      <div>
                        <p className="font-bold">{directorMovie.name}</p>
                        <p>Director</p>
                      </div>
                    )}
                    {movieScreenplay && (
                      <div>
                        <p className="font-bold">{movieScreenplay.name}</p>
                        <p>Screenplay</p>
                      </div>
                    )}
                  </div>
                  <Button
                    elementType={'a'}
                    color="danger"
                    className="mt-8"
                    title="Download Movie"
                    onClick={() => downloadMovie()}>
                    Download Movie
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <CastList isLoading={isLoadingCast} castList={castList?.cast || []} />
    </MainLayouts >
  )
}

export default DetailPage