const reviewForm = document.querySelector('.review-form');
const userName = document.getElementById('name');
const password = document.getElementById('password');
const rating = document.getElementById('rating');
const review = document.getElementById('review');

const reviewGroup = document.querySelector('.review-group');
const deleteBtn = document.querySelectorAll('.delete-btn');

let storage = [];
let id = 0;

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
  userName.value = '';
  password.value = '';
  rating.value = '⭐';
  review.value = '';

  saveReview(userReview);
};

// 리뷰 저장
const saveReview = (userReview) => {
  storage.push(userReview);
  localStorage.setItem('reviews', JSON.stringify(storage));
  getReview();
};

// 리뷰 가져오기
const getReview = () => {
  storage = JSON.parse(localStorage.getItem('reviews'));
  console.log(storage);
  if (storage === null) {
    return;
  }
  const reviewCard = storage
    .map((review) => {
      return `
        <div>
          <span>${review.name}(${review.rating})</span>
          <button>수정</button>
          <button class="delete-btn" type="button" onclick="deleteReview(${review.id})">삭제</button>
          <p>
            ${review.review}
          </p>
        </div>
  `;
    })
    .join('');
  reviewGroup.innerHTML = reviewCard;
};

const deleteReview = (id) => {
  console.log('click');
  // storage = storage.filter((review) => review.id !== id);
  // localStorage.setItem('reviews', JSON.stringify(storage));
  // getReview();
};

getReview();

reviewForm.addEventListener('submit', submitReview);
// deleteBtn.addEventListener('click', deleteReview);
