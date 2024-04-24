import axios from "axios";
import { BASE_TMDB_API_URL, TMDB_AUTH_KEY } from "../configs";
export const getDiscoverMovies = async (sortBy, page) => {
  const url = `${BASE_TMDB_API_URL}/discover/movie?page=${page}&sort_by=${sortBy}`;
  const authUrl = `${url}&api_key=${TMDB_AUTH_KEY}`;
  try {
    const { data } = await axios.get(authUrl);
    return data;
  } catch (error) {
    throw error.message;
  }
}

export const getMovieDetail = async (movieId) => {
  const url = `${BASE_TMDB_API_URL}/movie/${movieId}`;
  const auth = `${url}?api_key=${TMDB_AUTH_KEY}`
  try {
    const { data } = await axios.get(auth);
    return data
  } catch (error) {
    console.log(error);
  }
}

export const getCastListMovies = async (movieId) => {
  const url = `${BASE_TMDB_API_URL}/movie/${movieId}/credits`;
  const auth = `${url}?api_key=${TMDB_AUTH_KEY}`
  try {
    const { data } = await axios.get(auth);
    return data
  } catch (error) {
    console.log(error);
  }
}

export const getSearchMovies = async (search, pageParams) => {
  const url = `${BASE_TMDB_API_URL}/search/movie?query=${search}&page=${pageParams}`;
  const auth = `${url}&api_key=${TMDB_AUTH_KEY}`
  try {
    const { data } = await axios.get(auth);
    return data
  } catch (error) {
    console.log(error);
  }
}