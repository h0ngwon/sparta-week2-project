const reviewForm = document.querySelector(".review-form");
const userName = document.getElementById("name");
const password = document.getElementById("password");
const rating = document.getElementById("rating");
const review = document.getElementById("review");
const reviewGroup = document.querySelector(".review-group");

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
        <button class="modify-btn" onclick="editReview(${review.id}, ${review.password})">수정</button>
        <button class="delete-btn" onclick="deleteReview(${review.id}, ${review.password})">삭제</button>
        </div>
        <hr class="review-hr"/>
        </div>
        `;
		})
		.join("");
	reviewGroup.innerHTML = reviewCard;
};

// 리뷰 삭제
const deleteReview = (id, password) => {
	const deletePassword = Number(prompt("비밀번호를 입력하세요"));
	if (deletePassword !== password) {
		alert("비밀번호가 일치하지 않습니다.");
		return;
	}
	storage = storage.filter((review) => review.id !== id);
	saveReview();
};

// 리뷰 수정
const editReview = (id, password) => {
	const editPassword = Number(prompt("비밀번호를 입력하세요"));
	if (editPassword !== password) {
		alert("비밀번호가 일치하지 않습니다.");
		return;
	}

	const reviewToUpdate = storage.find((review) => review.id === id);

	console.log(reviewToUpdate);
	console.log(storage);

	const newRating = prompt(
		"새로운 평점을 입력하세요 (e.g. 5)",
		reviewToUpdate.rating
	);
	if (newRating !== null && !isNaN(Number(newRating))) {
		reviewToUpdate.rating = Number(newRating);
	}

	const newReviewText = prompt(
		"새로운 리뷰를 입력하세요",
		reviewToUpdate.review
	);
	if (newReviewText !== null && newReviewText.trim() !== "") {
		reviewToUpdate.review = newReviewText;
	}

	saveReview();
};

getReview();

reviewForm.addEventListener("submit", submitReview);
