import { useEffect, useState } from "react";
import Banner from "../components/Banner"
import MovieList from "../components/MovieList"
import MovieSortSelect from "../components/MovieSortSelect"
import MainLayouts from "../layout/MainLayouts"
import { Button, Spinner } from '@nextui-org/react';
import { useGetDiscoverMovies } from "../hooks/get-discover-movies";

const populateHeroCarouselData = (movieList) => {
  if (movieList.length >= 10) {
    return [...movieList].splice(0, 10).map((movie) => ({
      movieId: movie.id,
      movieName: movie.original_title,
      movieDescription: movie.overview,
      backdropPath: movie.backdrop_path,
    }));
  }
};
function Homepage() {
  const sortBy = 'popularity.desc' || 'title.desc';
  const [selectedSort, setSelectedSort] = useState(sortBy);
  const [slideData, setSlideData] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const sortData = [
    {
      value: 'title.asc',
      label: 'Less popular',
    },
    {
      value: 'popularity.desc',
      label: 'Most popular',
    }
  ]
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetDiscoverMovies(selectedSort);
  useEffect(() => {
    if (!isLoading &&
      data &&
      data?.pages[0].results?.length > 0 &&
      firstRender) {
      setFirstRender(false);
      setSlideData(populateHeroCarouselData(data?.pages[0].results));
    }
  }, [data, firstRender, isLoading]);
  return (
    <MainLayouts
      hero={<Banner
        slideList={slideData}
        isLoading={isLoading && firstRender}
      />}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-4xl">Discover Movies</h1>
        <MovieSortSelect selectedSort={selectedSort} sortData={sortData} setSelectedSort={setSelectedSort} />
      </div>
      <div className="flex flex-col gap-y-8">
        {
          data?.pages.map((page) => (
            <MovieList key={page.page} dataMovies={page?.results ?? []} />
          ))
        }
        {isLoading && (
          <div className="flex justify-center items-center my-16">
            <Spinner size="lg" color="secondary" />
          </div>
        )}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <Button
            isLoading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            Load more
          </Button>
        </div>
      )}
    </MainLayouts>
  )
}

export default Homepage