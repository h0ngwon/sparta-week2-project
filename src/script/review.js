const reviewForm = document.querySelector('.review-form');
const userName = document.getElementById('name');
const password = document.getElementById('password');
const rating = document.getElementById('rating');
const review = document.getElementById('review');

const reviewGroup = document.querySelector('.review-group');

let storage = [];

// 리뷰 등록
const submitReview = (e) => {
  e.preventDefault();
  const userReview = {
    name: userName.value,
    password: password.value,
    rating: rating.value,
    review: review.value,
  };

  storage.push(userReview);
  localStorage.setItem('reviews', JSON.stringify(storage));

  userName.value = '';
  password.value = '';
  rating.value = '';
  review.value = '';

  getReview();
};

// 리뷰 가져오기
const getReview = () => {
  const reviewResult = JSON.parse(localStorage.getItem('reviews'));
  console.log(reviewResult);
  const reviewCard = reviewResult
    .map((review) => {
      return `
        <div>
          <span>${review.name}(${review.rating})</span>
          <button>수정</button>
          <button class="delete-btn" onclick="deleteReview(${review.password})">삭제</button>
          <p>
            ${review.review}
          </p>
        </div>
  `;
    })
    .join('');
  reviewGroup.innerHTML = reviewCard;
};

const deleteBtn = document.querySelector('.delete-btn');

const deleteReview = () => {
  console.log('click');
};

reviewForm.addEventListener('submit', submitReview);
deleteBtn.addEventListener('click', deleteReview);
