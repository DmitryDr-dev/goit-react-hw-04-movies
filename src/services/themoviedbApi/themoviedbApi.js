const API_KEY = '38a8b5eed97c89a56b9d300da4ada9f7';
const BASE_URL = 'https://api.themoviedb.org';

// function to fetch trending movies
// https://developers.themoviedb.org/3/trending/get-trending
async function fetchTrendingMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/3/trending/movie/day?api_key=${API_KEY}`,
    );
    return response.ok
      ? await response.json()
      : Promise.reject(new Error('Not Found'));
  } catch (error) {
    console.log(
      "We've got a problem with fetching trending movies: ",
      error.message,
    );
  }
}

// function to fetch movie by name
// https://developers.themoviedb.org/3/search/search-movies
async function fetchMovieByName(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${query}`,
    );
    return response.ok
      ? await response.json()
      : Promise.reject(new Error('Not Found'));
  } catch (error) {
    console.log(
      "We've got a problem with fetching movie by query: ",
      error.message,
    );
  }
}

// function to fetch movie by id
// https://developers.themoviedb.org/3/movies/get-movie-details
async function fetchMovieById(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/3/movie/${id}?api_key=${API_KEY}`,
    );
    return response.ok
      ? await response.json()
      : Promise.reject(new Error('Not Found'));
  } catch (error) {
    console.log(
      "We've got a problem with fetching movie by query: ",
      error.message,
    );
  }
}

// function to fetch movie cast
// https://developers.themoviedb.org/3/movies/get-movie-credits
async function fetchMovieCastById(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/3/movie/${id}/credits?api_key=${API_KEY}`,
    );

    return response.ok
      ? await response.json()
      : Promise.reject(new Error('Not Found'));
  } catch (error) {
    console.log(
      "We've got a problem with fetching movie cast: ",
      error.message,
    );
  }
}

// function to fetch movie reviews
// https://developers.themoviedb.org/3/movies/get-movie-reviews
async function fetchMovieReviewsById(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/3/movie/${id}/reviews?api_key=${API_KEY}`,
    );

    return response.ok
      ? await response.json()
      : Promise.reject(new Error('Nothing Found'));
  } catch (error) {
    console.log(
      "We've got a problem with fetching movie reviews: ",
      error.message,
    );
  }
}

const movieApi = {
  fetchTrendingMovies,
  fetchMovieByName,
  fetchMovieById,
  fetchMovieCastById,
  fetchMovieReviewsById,
};

export default movieApi;
