const API_KEY = config.API_KEY;
const movieId = localStorage.getItem('movieId');
const main = document.querySelector('.container');
const backBtn = document.querySelector('.back_button');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
};

const getMovieDetailData = async () => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    options
  );
  const response = await data.json();
  return response;
};

const makeMovieDetail = async () => {
  const data = await getMovieDetailData();

  console.log(data);

  const image = createImage(
    'img',
    `${'https://image.tmdb.org/t/p/original'}` + data.poster_path
  );

  const infoGroup = createInfoGroup('div', 'info-group');
  const title = createTitle('h1', data.title);
  const tagline = createTagline('p', data.tagline);
  const genres = createGenres('div', data.genres);
  const releaseDate = createReleaseDate('p', data.release_date);
  const desc = createDesc('p', data.overview);

  appendChildren(infoGroup, [title, tagline, releaseDate, genres, desc]);
  appendChildren(main, [image, infoGroup]);
};

const createImage = (tagName, imageSrc) => {
  const element = document.createElement(tagName);
  element.src = imageSrc;

  return element;
};

const createInfoGroup = (tagName, className) => {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
};

const createTitle = (tagName, title) => {
  const element = document.createElement(tagName);
  element.textContent = title;
  element.className = 'movie-title';
  return element;
};

const createTagline = (tagName, tagline) => {
  const element = document.createElement(tagName);
  element.innerHTML = tagline ? '(' + tagline + ')' : '';
  element.className = 'tagline';

  return element;
};

const createReleaseDate = (tagName, date) => {
  const element = document.createElement(tagName);
  element.className = 'release-date';
  element.textContent = '개봉일 : ' + date;
  return element;
};

const createGenres = (tagName, genres) => {
  const element = document.createElement(tagName);
  genres.forEach((genre) => {
    const genreItem = document.createElement('span');
    genreItem.innerHTML = genre.name;
    genreItem.style.backgroundColor = randomBrightColor();
    appendChildren(element, [genreItem]);
  });
  element.className = 'genres';
  return element;
};

const createDesc = (tagName, desc) => {
  const element = document.createElement(tagName);
  element.className = 'desc';
  element.textContent = desc;
  return element;
};

const appendChildren = (parent, children) => {
  children.forEach((child) => {
    parent.append(child);
  });
};

const randomBrightColor = () => {
  let color_r = Math.floor(Math.random() * 127 + 128).toString(16);
  let color_g = Math.floor(Math.random() * 127 + 128).toString(16);
  let color_b = Math.floor(Math.random() * 127 + 128).toString(16);
  return `#${color_r + color_g + color_b}`;
};

backBtn.addEventListener('click', (e) => {
  window.history.back();
});

makeMovieDetail();
