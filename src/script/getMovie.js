const searchButton = document.querySelector('.search-btn');
const movieInput = document.querySelector('input');
const main = document.querySelector('.main');

// button click test
const searchBtnClick = (e) => {
	e.preventDefault();
	console.log('click');
};

// fetch option for TMDB
const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWUyMGU0ZmIxNTBiZDJmMWI0MjVmMjIxNWE2YmRjYiIsInN1YiI6IjYxZmJhNjlhY2I4MDI4NGFjZmYzYTk1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s0qfKixPyi99zIoSgu_oryvWZFRdCJp2ffSoPC-VCX0',
	},
};

// get movie data
const getMovie = async () => {
	const response = await fetch(
		'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
		options
	);

	const data = await response.json();
	console.log(data.results);

	data.results.forEach((d) => {
		makeMovieCard(d);
	});
};

// make movie cards
const makeMovieCard = (data) => {
	const card = document.createElement('div');
	card.className = 'card';

	const img = document.createElement('img');
	img.src = `${'https://image.tmdb.org/t/p/original'}` + data.poster_path;

	const title = document.createElement('h3');
	title.innerHTML = data.original_title;

	const desc = document.createElement('p');
	desc.className = 'desc';
	desc.innerHTML = data.overview;

	const rating = document.createElement('p');
	rating.innerHTML = "rating : " + data.vote_average;

	card.append(img);
	card.append(title);
	card.append(desc);
	card.append(rating);

	main.append(card);
};

// get filtered movie data
const getFilteredMovie = async () => {
	const response = await fetch(
		'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
		options
	);

	const data = await response.json();
};

// ----- when load -----
window.onload = getMovie;
movieInput.focus();

searchButton.addEventListener('click', getFilteredMovie);
