import { useParams } from 'react-router-dom';
import MainLayouts from '../layout/MainLayouts';
import { useGetSearchMovies } from '../hooks/use-get-search-movies';
import { Button, Spinner } from '@nextui-org/react';
import MovieList from '../components/MovieList';
import { MdSearchOff } from 'react-icons/md';

function SearchPage() {
  const { search } = useParams();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetSearchMovies({
      search
    });
  return (
    <MainLayouts>
      <h1 className="font-bold text-4xl mt-4 mb-8">
        Showing results for {search}
      </h1>

      {isLoading && (
        <div className="flex justify-center items-center my-16">
          <Spinner size="lg" color="secondary" />
        </div>
      )}

      {data?.pages && data?.pages[0].results.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-20">
          <MdSearchOff size={200} />
          <p className="text-lg font-medium">No results to show</p>
        </div>
      )}

      <div className="flex flex-col gap-y-8">
        {data?.pages?.map((page) => (
          <MovieList
            key={page.page}
            dataMovies={page?.results ?? []}
          />
        ))}
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

export default SearchPage