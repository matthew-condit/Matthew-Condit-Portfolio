function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

var items = document.querySelectorAll(".timeline li");
// code for the isElementInViewport function

function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      items[i].classList.add("in-view");
    }
  }
  if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    $('.arrow').hide();
  }
}

window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);