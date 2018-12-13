document.querySelectorAll('.button--next').forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('click')
    document.querySelector('.present').classList.replace('present', 'past');
    document.querySelector('.future').classList.replace('future', 'present');
  })
})