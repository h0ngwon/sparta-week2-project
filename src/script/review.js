const reviewForm = document.querySelector('.review-form');
const userName = document.getElementById('name');
const password = document.getElementById('password');
const rating = document.getElementById('rating');
const review = document.getElementById('review');

const reviewGroup = document.querySelector('.review-group');

// 리뷰 등록
const submitReview = (e) => {
  e.preventDefault();
  let storage = [];

  const userReview = {
    name: userName.value,
    password: password.value,
    rating: rating.value,
    review: review.value,
  };

  storage.push(userReview);
  console.log(storage);
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
        <span>${review.name}(${review.rating})</span>
        <button>수정</button>
        <button>삭제</button>
        <div>
          ${review.review}
        </div>
  `;
    })
    .join('');
  reviewGroup.innerHTML = reviewCard;
};

reviewForm.addEventListener('submit', submitReview);
