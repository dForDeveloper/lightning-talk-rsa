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
    document.querySelector('.present').classList.replace('present', 'future');
    document.querySelector('.past').classList.replace('past', 'present');
  })
})