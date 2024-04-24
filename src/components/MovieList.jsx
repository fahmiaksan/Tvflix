import MovieCard from "./MovieCard";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function MovieList({ dataMovies }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
      {dataMovies.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`}>
          <MovieCard
            key={movie.id}
            name={movie.original_title}
            posterPath={movie.poster_path}
            rating={+movie.vote_average.toFixed(1)}
            releaseDate={movie.release_date}
          />
        </Link>
      ))
      }
    </div>
  )
}

MovieList.propTypes = {
  dataMovies: PropTypes.array
}
export default MovieList