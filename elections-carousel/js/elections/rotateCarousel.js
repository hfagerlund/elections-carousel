function rotateCarousel(btnID,slideToXPosn,transTime) {
  $( '#' + btnID ).animate({
    left: slideToXPosn,
  }, transTime, function() {
    // animation complete
  });
}
