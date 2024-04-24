import { Card, Image, CardFooter, Chip } from '@nextui-org/react';
import { FaStar } from 'react-icons/fa';
import { MOVIE_POSTER_SIZE, BASE_TMDB_IMAGE_URL } from '../configs';
import dayjs from 'dayjs';
import PropTypes from 'prop-types'
function MovieCard({ name, posterPath, rating, releaseDate }) {
  return (
    <div>
      <Card
        isFooterBlurred
        className="relative w-full h-64 mb-3 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/50 transition-all"
      >
        <Image
          className='w-full h-full object-cover'
          loading='lazy'
          removeWrapper
          alt={`${name} poster`}
          src={
            posterPath ? `${BASE_TMDB_IMAGE_URL}/${MOVIE_POSTER_SIZE}/${posterPath}` : '/assets/no-photo.jpg'}
        />
        <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="w-full flex justify-between">
            <Chip
              color="secondary"
              startContent={<FaStar size={16} className="mx-1" />}
            >
              <span className="font-medium">{rating}</span>
            </Chip>
            <p className="font-medium text-white">
              {
                releaseDate ? dayjs(releaseDate).format("MMM YYYY") : "Unknown date"
              }
            </p>
          </div>
        </CardFooter>
      </Card>
      <p className="font-medium text-lg text-black dark:text-white">{name}</p>
    </div>
  )
}

MovieCard.propTypes = {
  name: PropTypes.string,
  posterPath: PropTypes.string,
  rating: PropTypes.number,
  releaseDate: PropTypes.string,
}

export default MovieCard