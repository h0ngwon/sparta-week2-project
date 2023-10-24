const API_KEY = config.API_KEY;
const movieId = localStorage.getItem("movieId");
const main = document.querySelector(".container");
const backBtn = document.querySelector(".back_button");

const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: API_KEY,
	},
};

const getMovieDetailData = async () => {
	const data = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
		options
	);
	const response = await data.json();
	return response;
};

const makeMovieDetail = async () => {
	const data = await getMovieDetailData();

	console.log(data);

	const image = createImage(
		"img",
		`${"https://image.tmdb.org/t/p/original"}` + data.poster_path
	);
	const title = createTitle("h1", data.title);
	const desc = createDesc("p", data.overview);

	appendChildren(main, [image, title, desc]);
};

const createImage = (tagName, imageSrc) => {
	const element = document.createElement(tagName);
	element.src = imageSrc;

	return element;
};

const createTitle = (tagName, title) => {
	const element = document.createElement(tagName);
	element.textContent = title;
	return element;
};

const createDesc = (tagName, desc) => {
	const element = document.createElement(tagName);
	element.className = "desc";
	element.textContent = desc;
	return element;
};

const appendChildren = (parent, children) => {
	children.forEach((child) => {
		parent.append(child);
	});
};

backBtn.addEventListener("click", (e) => {
    window.history.back();
});

makeMovieDetail();
