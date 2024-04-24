import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button
} from '@nextui-org/react';
import { Rating } from "react-simple-star-rating";
import { movieRatingListAtom } from './atom/movie-rating';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useAtom } from 'jotai';

function MovieRating({ rating, movieId }) {
  const [movieRatings, setMovieRatings] = useAtom(movieRatingListAtom);

  const handleRating = (newRating) => {
    let newRatingList = [...movieRatings];
    const indexRatingList = newRatingList.findIndex((movie) => movie.id === movieId);
    if (indexRatingList !== -1) {
      newRatingList[indexRatingList] = {
        movieId,
        rating: newRating,
      }
    } else {
      newRatingList = [
        ...newRatingList,
        {
          movieId,
          rating: newRating
        }
      ]
    }
    setMovieRatings([...newRatingList])
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button isIconOnly size='sm' title='Rate this movie'>
          {rating ? <AiFillStar size={18} /> : <AiOutlineStar size={18} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Rating
          emptyStyle={{ display: 'flex' }}
          SVGstyle={{ display: 'inline-block' }}
          initialValue={rating ?? 0}
          allowFraction
          onClick={handleRating}
        />
      </PopoverContent>
    </Popover>
  );
}

MovieRating.propTypes = {
  rating: PropTypes.number,
  movieId: PropTypes.number
}

export default MovieRating