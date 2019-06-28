// Navbar underline effect
const navlink = document.querySelectorAll('.nav-link');

navlink.forEach(function(e) {
    e.addEventListener('click', function(){
        navlink.forEach(a => a.classList.remove('current'));
        this.classList.toggle('current');
   	})
})

window.addEventListener('scroll', ev => {
  navlink.forEach(e => {
    let targetTop = document.querySelector(e.hash).offsetTop

    if(window.pageYOffset >= targetTop) {
      navlink.forEach(a => a.classList.remove('current'));
      e.classList.toggle('current');
    }
  })
})

//Responsive Navbar
document.querySelector('.hamburger').addEventListener('click', function(){
    this.classList.toggle('responsive');
    document.querySelector('.nav').classList.toggle('activeMenu');
 })
