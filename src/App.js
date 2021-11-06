// packages import
import { Switch, Route } from 'react-router-dom';

// components import
import AppBar from './components/AppBar';
import Container from './components/Container';

// views import
import { HomePage } from './views/HomePage';

function App() {
  // fetchTrendingMovies().then(resp => console.log(resp));

  return (
    <Container>
      <AppBar />
    </Container>
  );
}

export default App;

// Routes
// '/' - компонент <HomePage>, домашняя страница со списком популярных кинофильмов.
// '/movies' - компонент <MoviesPage>, страница поиска фильмов по ключевому слову.
// '/movies/:movieId' - компонент <MovieDetailsPage>, страница с детальной информацией о кинофильме.
// /movies/:movieId/cast - компонент <Cast>, информация о актерском составе. Рендерится на странице <MovieDetailsPage>.
// /movies/:movieId/reviews - компонент <Reviews>, информация об обзорах. Рендерится на странице <MovieDetailsPage>.

// package import

// styles import

// components import

// export default function name(){}
