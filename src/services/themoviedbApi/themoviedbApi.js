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

const movieApi = {
  fetchTrendingMovies,
};

export default movieApi;

// https://developers.themoviedb.org/3/search/search-movies - поиск кинофильма по ключевому слову на странице фильмов.
// https://developers.themoviedb.org/3/movies/get-movie-details - запрос полной информации о фильме для страницы кинофильма.
// https://developers.themoviedb.org/3/movies/get-movie-credits - запрос информации о актёрском составе для страницы кинофильма.
// https://developers.themoviedb.org/3/movies/get-movie-reviews - запрос обзоров для страницы кинофильма.
