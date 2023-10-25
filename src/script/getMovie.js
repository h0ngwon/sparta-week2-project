const searchButton = document.querySelector(".search-btn");
const moreButton = document.querySelector(".more");
const searchForm = document.querySelector(".search-form"); // submit 기능 위해서 search-form 추가
const movieInput = document.querySelector("input");
const main = document.querySelector(".main");
const API_KEY = config.API_KEY;
let page = 1;
let movieData = [];

// fetch option for TMDB
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: API_KEY,
    },
};

// getData
const getData = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${page}`,
        options
    );
    const data = await response.json();

    return data;
};

// make movies
const makeMovie = async () => {
    const data = await getData();
    const result = data.results;

    if (movieData.length === 0) {
        // copy no data on first call
        result.forEach((r) => {
            movieData.push(r);
        });
    }

    result.forEach((d) => {
        makeMovieCard(d);
    });
};
//make card
const makeCard = (tagName, className, data) => {
    const card = document.createElement(tagName);
    card.className = className;

    //when click alert movie data id
    card.addEventListener("click", (e) => {
        e.preventDefault();
        alert(`data id : ${data.id}`);
    });

    return card;
};

// make movie cards with information
const makeMovieCard = (data) => {
    const card = makeCard("div", "card", data);
    const imgWrapper = createImgWrapper("div", "img-wrapper");
    const img = createImage(
        "img",
        `${"https://image.tmdb.org/t/p/original"}` + data.poster_path
    );
    const title = createTitle("h3", data.title);
    const desc = createDesc("div", "desc", data.overview);
    const rating = createRating("div", "rating", data.vote_average);

    appendChildren(card, [imgWrapper, title, desc, rating]);
    appendChildren(imgWrapper, [img]);
    appendChildren(main, [card]);
};

// get filtered movie data
const getFilteredMovie = async (movieName) => {
    const data = document.querySelectorAll(".card");
    let inputValue = movieInput.value;
    const regx = new RegExp(inputValue, "gi"); //find patterns for matching input values

    if (inputValue.length === 0) {
        alert("검색어를 입력해주세요.");
    }

    if (movieName) {
        inputValue = movieName;
    }

    main.innerHTML = "";

    let foundMatch = false;

    movieData.forEach((data) => {
        if (data.title.match(regx)) {
            makeMovieCard(data);
            foundMatch = true;
        }
    });

    if (!foundMatch) {
        main.innerHTML += "검색 결과가 없습니다.";
    }

    //   movieData.forEach((data) => {
    //   	if (data.title.match(regx)) {
    //   		makeMovieCard(data);
    //   	}
    //   });
};

// get more movies
const getMoreMovieData = moreButton.addEventListener("click", async (e) => {
    page++;
    const data = await getData();
    const result = data.results;

    result.forEach((r) => {
        movieData.push(r);
    });

    makeMovie();
});

// search movies
const searchWhenInput = searchForm.addEventListener("submit", (e) => {
    getFilteredMovie();
});
// searchForm으로 변경하고 submit으로 변경

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
    element.innerHTML = "평점 : " + rating;

    return element;
};

const appendChildren = (parent, children) => {
    children.forEach((child) => {
        parent.append(child);
    });
};

// ----- when load -----
window.onload = makeMovie;

movieInput.value = "";
searchButton.addEventListener("click", getFilteredMovie);
