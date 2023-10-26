const reviewForm = document.querySelector(".review-form");
const userName = document.getElementById("name");
const password = document.getElementById("password");
const rating = document.getElementById("rating");
const review = document.getElementById("review");

const reviewGroup = document.querySelector(".review-group");
const deleteBtn = document.querySelectorAll(".delete-btn");

let storageMovieId = localStorage.getItem("movieId");
console.log(storageMovieId);
let storage = JSON.parse(localStorage.getItem(`${storageMovieId}`)) || [];
let id = storage.length;

// 새 리뷰
const submitReview = (e) => {
	e.preventDefault();
	const userReview = {
		name: userName.value,
		password: password.value,
		rating: rating.value,
		review: review.value,
		id: id++,
	};
	storage.push(userReview);
	reviewForm.reset();
	saveReview();
};

// 리뷰 저장
const saveReview = () => {
	localStorage.setItem(
		`${localStorage.getItem("movieId")}`,
		JSON.stringify(storage)
	);
	getReview();
};

// 리뷰 가져오기
const getReview = () => {
	const reviewCard = storage
		.map((review) => {
			return `
        <div>
        <span>${review.name}(${review.rating})</span>
        <button>수정</button>
        <button class="delete-btn" onclick="deleteReview(${review.id})">삭제</button>
        <p>
            ${review.review}
        </p>
        </div>`;
		})
		.join("");
	reviewGroup.innerHTML = reviewCard;
};

// 리뷰 삭제
const deleteReview = (id) => {
	storage = storage.filter((review) => review.id !== id);
	saveReview();
};

getReview();

reviewForm.addEventListener("submit", submitReview);
