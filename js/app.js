let dropdown = document.querySelector('#dropdown');
let dropnav = document.querySelector('.nav-holder');
dropdown.addEventListener('click', function() {
    dropnav.classList.toggle('dropdown-menu');
});