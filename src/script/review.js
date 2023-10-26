const reviewForm = document.querySelector(".review-form");
const userName = document.getElementById("name");
const password = document.getElementById("password");
const rating = document.getElementById("rating");
const review = document.getElementById("review");
const reviewGroup = document.querySelector(".review-group");
const deleteBtn = document.querySelectorAll(".delete-btn");

let storageMovieId = localStorage.getItem("movieId");
let storage = JSON.parse(localStorage.getItem(storageMovieId)) || [];
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
	localStorage.setItem(storageMovieId, JSON.stringify(storage));
	getReview();
};

// 리뷰 가져오기
const getReview = () => {
	const reviewCard = storage
		.map((review) => {
			return `
        <div class="reviews">
        <span class="user-info">${review.name}(${review.rating})</span>
        <p>
            ${review.review}
        </p>
        <div class="btn-group">
        <button class="modify-btn">수정</button>
        <button class="delete-btn" onclick="deleteReview(${review.id})">삭제</button>
        </div>
        <hr class="review-hr"/>
        </div>
        `;
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
