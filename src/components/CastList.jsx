import { Card, CardBody, CardFooter, Image, Spinner } from "@nextui-org/react"
import { BASE_TMDB_IMAGE_URL, MOVIE_POSTER_SIZE } from "../configs";
import PropTypes from 'prop-types';

function CastList({ isLoading, castList }) {
  return (
    <section>
      <h2 className="text-4xl font-bold my-8">Cast</h2>

      {isLoading && (
        <div className="flex justify-center items-center my-16">
          <Spinner size="lg" color="secondary" />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
        {castList.map((cast) => (
          <Card shadow="sm" key={cast.cast_id} isPressable>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={cast.original_name}
                loading="lazy"
                className="w-full object-cover h-[200px]"
                src={
                  cast.profile_path
                    ? `${BASE_TMDB_IMAGE_URL}/${MOVIE_POSTER_SIZE}/${cast.profile_path}`
                    : "/assets/no-photo.jpg"
                }
              />
            </CardBody>
            <CardFooter className="text-small flex flex-col flex-grow">
              <b>{cast.original_name}</b>
              <p className="text-default-500">{cast.character}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

CastList.propTypes = {
  isLoading: PropTypes.bool,
  castList: PropTypes.array
}

export default CastList