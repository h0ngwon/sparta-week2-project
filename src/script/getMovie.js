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

// getData
const getData = async () => {
	const response = await fetch(
		'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
		options
	);
	const data = await response.json();

	return data;
};

// make movies
const makeMovie = async () => {
	const data = await getData();
	const result = data.results;

	result.forEach((d) => {
		makeMovieCard(d);
	});
};

//make card
const makeCard = (tagName, className, data) => {
	const card = document.createElement(tagName);
	card.className = className;

	//when click alert movie data id
	card.addEventListener('click', (e) => {
		e.preventDefault();
		alert(`data id : ${data.id}`);
	});

	return card;
};

// make movie cards with information
const makeMovieCard = (data) => {
	const card = makeCard('div', 'card', data);
	const imgWrapper = createImgWrapper('div', 'img-wrapper');
	const img = createImage(
		'img',
		`${'https://image.tmdb.org/t/p/original'}` + data.poster_path
	);
	const title = createTitle('h3', data.title);
	const desc = createDesc('div', 'desc', data.overview);
	const rating = createRating('div', 'rating', data.vote_average);

	appendChildren(imgWrapper, [img]);
	appendChildren(card, [imgWrapper, title, desc, rating]);
	appendChildren(main, [card]);
};

// get filtered movie data
const getFilteredMovie = async (movieName) => {
	const data = await getData();
	const result = data.results;
	let inputValue = movieInput.value;
    const regx = new RegExp(inputValue, 'gi'); //find patterns for matching input values

	if (movieName) {
		inputValue = movieName;
	}

	main.innerHTML = '';

	result.forEach((data) => {
		if (data.title.match(regx)) {
			makeMovieCard(data);
		}
	});

	movieInput.focus();
};

const searchWhenEnteredPressed = movieInput.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		getFilteredMovie(e.currentTarget.value);
	}
});

const createImgWrapper = (tagName, className) => {
	const element = document.createElement(tagName);
	element.className = className;

	return element;
};

const createImage = (tagName, imageSrc) => {
	const element = document.createElement(tagName);
	element.src = imageSrc;

	return element;
};

const createTitle = (tagName, title) => {
	const element = document.createElement(tagName);
	element.innerHTML = title;

	return element;
};

const createDesc = (tagName, className, desc) => {
	const element = document.createElement(tagName);
	element.className = className;
	element.innerHTML = desc;

	return element;
};

const createRating = (tagName, className, rating) => {
	const element = document.createElement(tagName);
	element.className = className;
	element.innerHTML = 'rating : ' + rating;

	return element;
};

const appendChildren = (parent, children) => {
	children.forEach((child) => {
		parent.append(child);
	});
};

// ----- when load -----
window.onload = makeMovie;

movieInput.focus();
movieInput.value = '';

searchButton.addEventListener('click', getFilteredMovie);
