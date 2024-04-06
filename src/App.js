import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import MoviesPage from './pages/Movies/MoviesPage';
import HomePage from './pages/Home/HomePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

//homepage => /
//all movies page + search => /movies || /movie?search=q
//movie details page => /movies/:id

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<AppLayout />} className='app-layout'>
					<Route index element={<HomePage />} className='home' />
					<Route path='/movies'>
						<Route index element={<MoviesPage />} />
						<Route path=':id' element={<MovieDetailPage />} />
					</Route>
				</Route>

				<Route path='*' element={<NotFoundPage />}></Route>
			</Routes>
		</div>
	);
}

export default App;
