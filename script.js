//toggle class active hamburger
const navbarNav = document.querySelector('.navbar-nav');
document.querySelector('#hamburger-menu'). onclick = ( ) => {
  navbarNav.classList.toggle('active');
};

// toggle class active searchform
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

// toggle Class active Shopping Cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
}
document.querySelector('#search-button'). onclick = ( ) => {
  searchForm.classList.toggle('active');
};

// klik di luar sidebar untuk menghilangkan nav
const hamburger = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function(e) {
  if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
  if(!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }
  if(!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});


// modal box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  };
});


// Close Button
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
}


window.onclick = (e) => {
  if(e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
}