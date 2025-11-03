AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true // Chỉ animate 1 lần
});

window.addEventListener('load', function() {
  const preloaderHeart = document.querySelector('.preloader-heart');
  const preloaderBack = document.querySelector('.preloader-back');
  if (preloaderHeart) {
    preloaderHeart.style.display = 'none';
  }
  if (preloaderBack) {
    preloaderBack.style.display = 'none';
  }
});