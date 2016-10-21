$(window).on('load', function() {
  $('.masonry').masonry({
    columnWidth: 320,
    itemSelector: '.grid-item'
    }).imagesLoaded(function() {
      $('.masonry').masonry('reloadItems').layout();
    });
});