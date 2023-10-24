const reviewForm = document.querySelector('.review-form');
const userName = document.getElementById('name');
const password = document.getElementById('password');
const rating = document.getElementById('rating');
const review = document.getElementById('review');

const reviewGroup = document.querySelector('.review-group');

// 리뷰 등록
const submitReview = (e) => {
  e.preventDefault();
  const userReview = {
    name: userName.value,
    password: password.value,
    rating: rating.value,
    review: review.value,
  };
  localStorage.setItem('review', JSON.stringify(userReview));
  console.log(userReview);
  userName.value = '';
  password.value = '';
  rating.value = '';
  review.value = '';

  getReview();
};

// 리뷰 가져오기
const getReview = () => {
  const reviewResult = JSON.parse(localStorage.getItem('review'));
  console.log(reviewResult);
  reviewGroup.innerHTML = `
        <span>${reviewResult.name}(${reviewResult.rating})</span>
        <button>수정</button>
        <button>삭제</button>
        <div>
          ${reviewResult.review}
        </div>
  `;
};

reviewForm.addEventListener('submit', submitReview);
