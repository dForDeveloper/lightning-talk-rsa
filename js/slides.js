document.querySelectorAll('.button--next').forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.present').classList.replace('present', 'past');
    document.querySelector('.future').classList.replace('future', 'present');
  });
});

document.querySelectorAll('.button--back').forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.present').classList.replace('present', 'future')
    document.querySelectorAll('.past').forEach((slide, index, slides) => {
      if (index === slides.length - 1) {
        slide.classList.replace('past', 'present');
      }
    });
  });
});

document.querySelector('.button--app-link').addEventListener('click', function(event) {
  event.preventDefault();
  document.querySelector('.present').classList.replace('present', 'past');
  document.querySelectorAll('.future').forEach(slide => {
    slide.classList.replace('future', 'past');
  });
  document.querySelector('.slide__app').classList.replace('past', 'present');
});